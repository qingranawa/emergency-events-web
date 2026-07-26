/* D1-backed page content renderer. The database stores content as data; the
 * renderer only writes textContent/attributes and never executes stored HTML. */
(() => {
    'use strict';

    const COPY_ICON = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';

    const createElement = (tag, className, text) => {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (text !== undefined) element.textContent = text;
        return element;
    };

    const appendRichText = (parent, text, links = []) => {
        let cursor = 0;
        const matches = links
            .map(link => ({ ...link, index: text.indexOf(link.label, cursor) }))
            .filter(link => link.index >= 0)
            .sort((left, right) => left.index - right.index);

        matches.forEach(link => {
            if (link.index < cursor) return;
            parent.append(document.createTextNode(text.slice(cursor, link.index)));
            const anchor = createElement('a', 'license-link content-footer-link', link.label);
            anchor.href = link.href;
            anchor.target = '_blank';
            anchor.rel = 'noopener noreferrer';
            if (link.strong) {
                const strong = createElement('strong');
                strong.append(anchor);
                parent.append(strong);
            } else {
                parent.append(anchor);
            }
            cursor = link.index + link.label.length;
        });

        parent.append(document.createTextNode(text.slice(cursor)));
    };

    const renderNavigation = (documentData) => {
        const navigation = documentData.navigation;
        document.querySelector('.toc-brand-text').textContent = navigation.brand;
        document.querySelector('.toc-brand-sub').textContent = navigation.subbrand;
        document.querySelector('.toc-mobile-eyebrow').textContent = navigation.subbrand;

        const desktop = document.querySelector('.toc-links');
        const mobile = document.querySelector('.toc-mobile-links');
        desktop.replaceChildren();
        mobile.replaceChildren();

        navigation.items.forEach((item, index) => {
            const desktopItem = createElement('li');
            const desktopLink = createElement('a', index === 0 ? 'active' : '', item.label);
            desktopLink.href = `#${item.id}`;
            if (index === 0) desktopLink.setAttribute('aria-current', 'page');
            desktopItem.append(desktopLink);
            desktop.append(desktopItem);

            const mobileLink = createElement('a');
            mobileLink.href = `#${item.id}`;
            mobileLink.append(createElement('span', '', String(index + 1).padStart(2, '0')));
            mobileLink.append(document.createTextNode(item.label));
            mobile.append(mobileLink);
        });
    };

    const renderIntro = (documentData, root) => {
        documentData.intro.forEach((intro) => {
            const section = createElement('section', 'section');
            section.id = intro.id;
            section.append(createElement('h2', '', intro.heading));
            intro.paragraphs.forEach((paragraph, index) => {
                const element = createElement('p');
                if (intro.id === 'evacuation' && index === 0) {
                    element.append(createElement('strong', '', paragraph));
                } else {
                    element.textContent = paragraph;
                }
                section.append(element);
            });
            if (intro.items.length) {
                const list = createElement('ul');
                intro.items.forEach(item => list.append(createElement('li', '', item)));
                section.append(list);
            }
            if (intro.id === 'notice') {
                const themeButton = document.getElementById('theme-toggle');
                if (themeButton) section.append(themeButton.parentElement);
            }
            root.append(section);
        });
    };

    const renderEvent = (event) => {
        const article = createElement('article', 'event');
        article.append(createElement('h3', '', event.title));
        event.broadcasts.forEach(broadcast => {
            const broadcastElement = createElement('div', 'broadcast');
            const copyButton = createElement('button', 'copy-btn');
            copyButton.type = 'button';
            copyButton.setAttribute('aria-label', '复制');
            copyButton.innerHTML = COPY_ICON;
            broadcastElement.append(copyButton, createElement('span', 'broadcast-text', broadcast));
            article.append(broadcastElement);
        });
        if (event.task) article.append(createElement('p', 'task', event.task));
        if (event.summary) article.append(createElement('p', 'summary', event.summary));
        return article;
    };

    const renderEventSections = (documentData, root) => {
        documentData.event_sections.forEach(sectionData => {
            const section = createElement('section', 'section');
            section.id = sectionData.id;
            section.append(createElement('h2', '', sectionData.heading));
            sectionData.events.forEach(event => section.append(renderEvent(event)));
            root.append(section);
        });
    };

    const renderChangelog = (documentData, root) => {
        const container = createElement('section', 'changelog-container');
        container.id = 'changelog';
        container.append(createElement('h2', 'changelog-title', documentData.changelog.heading));
        const changelog = createElement('div', 'changelog');
        const details = createElement('details', 'changelog-details');
        const summary = createElement('summary', 'changelog-summary');
        summary.append(createElement('span', '', documentData.changelog.summary || '查看更新日志'));
        const icon = createElement('span', 'dropdown-icon', '⌄');
        icon.setAttribute('aria-hidden', 'true');
        summary.append(icon);
        details.append(summary);
        const list = createElement('ul', 'changelog-list');
        documentData.changelog.entries.forEach(entry => {
            const item = createElement('li', entry.classes.join(' '));
            item.append(createElement('span', 'version-badge', entry.version));
            item.append(createElement('span', 'update-text', entry.text));
            list.append(item);
        });
        details.append(list);
        changelog.append(details);
        container.append(changelog);
        root.append(container);
    };

    const renderQuote = (documentData, root) => {
        const container = createElement('section', 'poem-container');
        const quote = createElement('div', 'poem');
        quote.id = 'daily-quote';
        const footer = createElement('div', 'poem-footer');
        const refresh = createElement('button', 'refresh-btn', '换一句');
        refresh.type = 'button';
        refresh.id = 'refresh-quote';
        const count = createElement('span', 'quote-count');
        count.id = 'quote-count';
        footer.append(refresh, count);
        container.append(quote, footer);
        root.append(container);

        const quotes = [...documentData.quotes];
        let displayed = [];
        const display = () => {
            if (displayed.length >= quotes.length) displayed = [];
            const available = quotes.filter(item => !displayed.includes(item));
            const selected = available[Math.floor(Math.random() * available.length)];
            displayed.push(selected);
            quote.classList.remove('animate-in');
            void quote.offsetWidth;
            quote.replaceChildren(createElement('span', 'quote-text', selected));
            quote.classList.add('animate-in');
            count.textContent = `${displayed.length}/${quotes.length}`;
        };
        refresh.addEventListener('click', display);
        quote.addEventListener('click', display);
        display();
    };

    const renderFooter = (documentData) => {
        const footer = document.getElementById('site-footer');
        const data = documentData.footer;
        const container = createElement('div', 'footer-container');
        container.id = 'footer-container';
        const content = createElement('div', 'footer-content');

        const authorSection = createElement('div', 'section');
        const authorWrap = createElement('div', 'author-section');
        authorWrap.append(createElement('h3', 'section-title', '项目作者'));
        const authorGrid = createElement('div', 'author-grid');
        data.authors.forEach(author => {
            const card = createElement('article', 'author-card');
            const avatarWrap = createElement('div', 'avatar-container');
            const avatar = createElement('img', 'author-avatar');
            avatar.src = author.avatar;
            avatar.alt = author.name;
            avatar.width = 96;
            avatar.height = 96;
            avatar.loading = 'lazy';
            avatarWrap.append(avatar);
            const info = createElement('div', 'author-info');
            info.append(createElement('h4', 'author-name', author.name));
            info.append(createElement('p', 'author-role', author.role));
            const contact = createElement('a', 'author-contact', author.email);
            contact.href = `mailto:${author.email}`;
            info.append(contact);
            card.append(avatarWrap, info);
            authorGrid.append(card);
        });
        authorWrap.append(authorGrid);
        authorSection.append(authorWrap);
        content.append(authorSection);

        const thanksSection = createElement('div', 'section');
        const thanks = createElement('div', 'thanks-section');
        thanks.append(createElement('h3', 'section-title', '特别鸣谢'));
        const mainThanks = createElement('div', 'main-thanks');
        data.thanks.forEach(text => mainThanks.append(createElement('p', '', text)));
        thanks.append(mainThanks);
        const contributors = createElement('div', 'contributors');
        contributors.append(createElement('p', 'contributors-title', '感谢以下人员及制作组的贡献：'));
        const contributorList = createElement('ul', 'contributor-list');
        data.contributors.forEach(text => contributorList.append(createElement('li', '', text)));
        contributors.append(contributorList);
        thanks.append(contributors);
        thanksSection.append(thanks);
        content.append(thanksSection);

        const copyrightSection = createElement('div', 'section');
        copyrightSection.append(createElement('h3', 'section-title', '版权信息'));
        const linkData = data.links || {};
        const wiki = linkData.scp_wiki || 'https://scp-wiki-cn.wikidot.com/';
        const cc = linkData.cc || 'https://creativecommons.org/licenses/by-sa/3.0/';
        const emblem = linkData.emblem || 'https://commons.wikimedia.org/wiki/File:SCP_Foundation_(emblem).svg';
        const linkSets = [
            [{ label: 'SCP基金会', href: wiki, strong: true }],
            [{ label: 'CC BY-SA 3.0', href: cc, strong: true }],
            [{ label: 'Wikimedia Commons', href: emblem, strong: true }, { label: 'CC BY-SA 3.0', href: cc, strong: true }],
        ];
        data.copyright_paragraphs.forEach((text, index) => {
            const paragraph = createElement('p', 'section-text');
            appendRichText(paragraph, text, linkSets[index] || []);
            copyrightSection.append(paragraph);
        });
        const license = createElement('div', 'license-section');
        const licenseInfo = createElement('div', 'license-info');
        const licenseLinks = [
            [{ label: '知识共享 署名-相同方式共享 3.0 协议', href: cc, strong: true }],
            [{ label: 'Creative Commons Attribution-ShareAlike 3.0 Unported License', href: cc, strong: true }],
            [{ label: 'SCP基金会', href: wiki, strong: true }],
        ];
        data.license_text.forEach((text, index) => {
            const paragraph = createElement('p', 'license-text');
            appendRichText(paragraph, text, licenseLinks[index] || []);
            licenseInfo.append(paragraph);
        });
        const wikiParagraph = createElement('p', 'wiki-link');
        appendRichText(wikiParagraph, data.wiki_text, licenseLinks[2]);
        licenseInfo.append(wikiParagraph);
        const icons = createElement('div', 'license-icons');
        data.license_icons.forEach(iconData => {
            const image = createElement('img');
            image.src = iconData.src;
            image.alt = iconData.alt;
            image.loading = 'lazy';
            icons.append(image);
        });
        license.append(licenseInfo, icons);
        copyrightSection.append(license);
        content.append(copyrightSection);

        container.append(content);
        footer.replaceChildren(container);
    };

    const render = (documentData) => {
        document.title = documentData.metadata.title;
        document.querySelector('meta[name="description"]').content = documentData.metadata.description;
        document.querySelector('.main-title').textContent = documentData.hero.title;
        document.querySelector('.hero-subtitle').textContent = documentData.hero.subtitle;
        renderNavigation(documentData);

        const root = document.getElementById('content-root');
        root.replaceChildren();
        renderIntro(documentData, root);
        renderEventSections(documentData, root);
        renderChangelog(documentData, root);
        renderQuote(documentData, root);
        renderFooter(documentData);
        document.dispatchEvent(new CustomEvent('content:ready', { detail: documentData }));
    };

    const showError = () => {
        const loading = document.getElementById('content-loading');
        if (!loading) return;
        loading.className = 'content-state is-error';
        loading.textContent = '事件资料暂时无法加载，请稍后刷新页面重试。';
    };

    const load = async () => {
        try {
            const response = await fetch('/api/content', { headers: { Accept: 'application/json' } });
            if (!response.ok) throw new Error(`content API ${response.status}`);
            const documentData = await response.json();
            render(documentData);
        } catch (error) {
            console.error('[content] failed to load D1 document', error);
            showError();
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', load, { once: true });
    } else {
        load();
    }
})();
