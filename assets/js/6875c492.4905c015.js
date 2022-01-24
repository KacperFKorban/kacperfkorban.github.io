"use strict";(self.webpackChunkkacperfkorban_github_io=self.webpackChunkkacperfkorban_github_io||[]).push([[610],{8665:function(e,t,a){a.d(t,{Z:function(){return E}});var r=a(3366),l=a(7294),n=a(6010),s=a(1066),m=a(9960),i="sidebar_q+wC",c="sidebarItemTitle_9G5K",o="sidebarItemList_6T4b",u="sidebarItem_cjdF",g="sidebarItemLink_zyXk",d="sidebarItemLinkActive_wcJs",p=a(5999);function h(e){var t=e.sidebar;return 0===t.items.length?null:l.createElement("nav",{className:(0,n.Z)(i,"thin-scrollbar"),"aria-label":(0,p.I)({id:"theme.blog.sidebar.navAriaLabel",message:"Blog recent posts navigation",description:"The ARIA label for recent posts in the blog sidebar"})},l.createElement("div",{className:(0,n.Z)(c,"margin-bottom--md")},t.title),l.createElement("ul",{className:o},t.items.map((function(e){return l.createElement("li",{key:e.permalink,className:u},l.createElement(m.Z,{isNavLink:!0,to:e.permalink,className:g,activeClassName:d},e.title))}))))}var b=["sidebar","toc","children"];var E=function(e){var t=e.sidebar,a=e.toc,m=e.children,i=(0,r.Z)(e,b),c=t&&t.items.length>0;return l.createElement(s.Z,i,l.createElement("div",{className:"container margin-vert--lg"},l.createElement("div",{className:"row"},c&&l.createElement("aside",{className:"col col--3"},l.createElement(h,{sidebar:t})),l.createElement("main",{className:(0,n.Z)("col",{"col--7":c,"col--9 col--offset-1":!c}),itemScope:!0,itemType:"http://schema.org/Blog"},m),a&&l.createElement("div",{className:"col col--2"},a))))}},8902:function(e,t,a){a.d(t,{Z:function(){return y}});var r=a(7294),l=a(6010),n=a(3905),s=a(5999),m=a(9960),i=a(4996),c=a(3810),o=a(6309),u=a(7462),g=a(3366),d="iconEdit_mS5F",p=["className"];var h=function(e){var t=e.className,a=(0,g.Z)(e,p);return r.createElement("svg",(0,u.Z)({fill:"currentColor",height:"20",width:"20",viewBox:"0 0 40 40",className:(0,l.Z)(d,t),"aria-hidden":"true"},a),r.createElement("g",null,r.createElement("path",{d:"m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"})))};function b(e){var t=e.editUrl;return r.createElement("a",{href:t,target:"_blank",rel:"noreferrer noopener",className:c.kM.common.editThisPage},r.createElement(h,null),r.createElement(s.Z,{id:"theme.common.editThisPage",description:"The link label to edit the current page"},"Edit this page"))}var E="blogPostTitle_d4p0",v="blogPostData_-Im+",f="blogPostDetailsFull_xD8n",N=a(7774),_="tags_NBRY",Z="tag_F03v";function k(e){var t=e.tags;return r.createElement(r.Fragment,null,r.createElement("b",null,r.createElement(s.Z,{id:"theme.tags.tagsListLabel",description:"The label alongside a tag list"},"Tags:")),r.createElement("ul",{className:(0,l.Z)(_,"padding--none","margin-left--sm")},t.map((function(e){var t=e.label,a=e.permalink;return r.createElement("li",{key:a,className:Z},r.createElement(N.Z,{name:t,permalink:a}))}))))}var P="image_9q7L";var T=function(e){var t=e.author,a=t.name,l=t.title,n=t.url,s=t.imageURL;return r.createElement("div",{className:"avatar margin-bottom--sm"},s&&r.createElement(m.Z,{className:"avatar__photo-link avatar__photo",href:n},r.createElement("img",{className:P,src:s,alt:a})),a&&r.createElement("div",{className:"avatar__intro",itemProp:"author",itemScope:!0,itemType:"https://schema.org/Person"},r.createElement("div",{className:"avatar__name"},r.createElement(m.Z,{href:n,itemProp:"url"},r.createElement("span",{itemProp:"name"},a))),l&&r.createElement("small",{className:"avatar__subtitle",itemProp:"description"},l)))},w="authorCol_8c0z";function L(e){var t=e.authors,a=e.assets;return 0===t.length?null:r.createElement("div",{className:"row margin-top--md margin-bottom--sm"},t.map((function(e,t){var n;return r.createElement("div",{className:(0,l.Z)("col col--6",w),key:t},r.createElement(T,{author:Object.assign({},e,{imageURL:null!=(n=a.authorsImageUrls[t])?n:e.imageURL})}))})))}var y=function(e){var t,a,u,g,d=(u=(0,c.c2)().selectMessage,function(e){var t=Math.ceil(e);return u(t,(0,s.I)({id:"theme.blog.post.readingTime.plurals",description:'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',message:"One min read|{readingTime} min read"},{readingTime:t}))}),p=(0,i.C)().withBaseUrl,h=e.children,N=e.frontMatter,_=e.assets,Z=e.metadata,P=e.truncated,T=e.isBlogPostPage,w=void 0!==T&&T,y=Z.date,I=Z.formattedDate,M=Z.permalink,C=Z.tags,U=Z.readingTime,x=Z.title,B=Z.editUrl,R=Z.authors,z=null!=(t=_.image)?t:N.image,F=!w&&P,A=C.length>0;return r.createElement("article",{className:w?void 0:"margin-bottom--xl",itemProp:"blogPost",itemScope:!0,itemType:"http://schema.org/BlogPosting"},(g=w?"h1":"h2",r.createElement("header",null,r.createElement(g,{className:E,itemProp:"headline"},w?x:r.createElement(m.Z,{itemProp:"url",to:M},x)),r.createElement("div",{className:(0,l.Z)(v,"margin-vert--md")},r.createElement("time",{dateTime:y,itemProp:"datePublished"},I),void 0!==U&&r.createElement(r.Fragment,null," \xb7 ",d(U))),r.createElement(L,{authors:R,assets:_}))),z&&r.createElement("meta",{itemProp:"image",content:p(z,{absolute:!0})}),r.createElement("div",{className:"markdown",itemProp:"articleBody"},r.createElement(n.Zo,{components:o.Z},h)),(A||P)&&r.createElement("footer",{className:(0,l.Z)("row docusaurus-mt-lg",(a={},a[f]=w,a))},A&&r.createElement("div",{className:(0,l.Z)("col",{"col--9":F})},r.createElement(k,{tags:C})),w&&B&&r.createElement("div",{className:"col margin-top--sm"},r.createElement(b,{editUrl:B})),F&&r.createElement("div",{className:(0,l.Z)("col text--right",{"col--3":A})},r.createElement(m.Z,{to:Z.permalink,"aria-label":"Read more about "+x},r.createElement("b",null,r.createElement(s.Z,{id:"theme.blog.post.readMore",description:"The label used in blog post item excerpts to link to full blog posts"},"Read More"))))))}},9404:function(e,t,a){a.r(t),a.d(t,{default:function(){return c}});var r=a(7294),l=a(9960),n=a(8665),s=a(8902),m=a(5999),i=a(3810);function c(e){var t,a=e.metadata,c=e.items,o=e.sidebar,u=a.allTagsPath,g=a.name,d=a.count,p=(t=(0,i.c2)().selectMessage,function(e){return t(e,(0,m.I)({id:"theme.blog.post.plurals",description:'Pluralized label for "{count} posts". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',message:"One post|{count} posts"},{count:e}))}),h=(0,m.I)({id:"theme.blog.tagTitle",description:"The title of the page for a blog tag",message:'{nPosts} tagged with "{tagName}"'},{nPosts:p(d),tagName:g});return r.createElement(n.Z,{title:h,wrapperClassName:i.kM.wrapper.blogPages,pageClassName:i.kM.page.blogTagPostListPage,searchMetadata:{tag:"blog_tags_posts"},sidebar:o},r.createElement("header",{className:"margin-bottom--xl"},r.createElement("h1",null,h),r.createElement(l.Z,{href:u},r.createElement(m.Z,{id:"theme.tags.tagsPageLink",description:"The label of the link targeting the tag list page"},"View All Tags"))),c.map((function(e){var t=e.content;return r.createElement(s.Z,{key:t.metadata.permalink,frontMatter:t.frontMatter,assets:t.assets,metadata:t.metadata,truncated:!0},r.createElement(t,null))})))}},7774:function(e,t,a){a.d(t,{Z:function(){return c}});var r=a(7294),l=a(6010),n=a(9960),s="tag_WK-t",m="tagRegular_LXbV",i="tagWithCount_S5Zl";var c=function(e){var t,a=e.permalink,c=e.name,o=e.count;return r.createElement(n.Z,{href:a,className:(0,l.Z)(s,(t={},t[m]=!o,t[i]=o,t))},c,o&&r.createElement("span",null,o))}}}]);