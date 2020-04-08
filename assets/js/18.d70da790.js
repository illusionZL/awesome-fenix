(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{292:function(e,t,r){"use strict";r.r(t);var a=r(11),s=Object(a.a)({},(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[r("h1",{attrs:{id:"透明多级分流系统"}},[e._v("透明多级分流系统 "),r("Badge",{attrs:{text:"编写中",type:"warning"}})],1),e._v(" "),r("p",[e._v("用户使用信息系统的过程中，请求从浏览器出发，通过网络，触及存储到最后端的数据库服务器中的数据，然后再返回到用户的浏览器，这其中要经过许许多多的技术基础设施。作为系统的设计者，我们应该意识到：不同的设施、部件在系统中有各自不同的价值。它们有一些位于网络的边缘，能够迅速响应用户的请求，避免给后端网络带来压力；有一些易于伸缩拓展，可以使用较小的代价，譬如堆叠机器来获得与用户数量相匹配的处理能力；但也有一些设施是难以扩展的单点部件，只能依靠堆砌机器本身的性能来提升处理能力（典型的就是传统RDBMS，在事务处理的"),r("RouterLink",{attrs:{to:"/architect-perspective/general-architecture/transaction.html#cap与acid"}},[e._v("CAP部分")]),e._v("中，我们曾讨论过传统数据库为了同时具备可用性和一致性，放弃了分区容错性）。")],1),e._v(" "),r("p",[e._v("在进行系统设计时一个普适的原则是尽最大限度减少到达单点部件的流量，譬如，许多的用户请求（譬如获取一张图片）在系统中往往会有多个部件能够处理（譬如浏览器缓存、CDN、反向代理、Web服务器、文件服务器、数据库都有可能提供这张图片），而恰如其分地将请求分流至最合适的组件中，避免所有流量都汇集到单点，同时仍能够（在绝大多数时候）保证处理结果的准确性，这便架构设计中分流的原则。缓存、节流、负载均衡等这类措施，都是为了达成该原则所采用的工具与手段。一个现代的企业或互联网系统，其中所涉及到的分流手段数量之多、场景之广，可能连它的开发者本身都未必能全部意识到程度。这听起来似乎并不合理，但我觉得这恰好是系统设计得优秀的一种体现，分布广阔谓之“多级”，意识不到谓之“透明”，也就是本章我们要讨论的话题“"),r("strong",[e._v("透明多级分流系统")]),e._v("”（Transparent Multi-Level Diversion System）的来由。笔者将信息系统中我们可能使用到的分流手段，按从前（用户端）到后（服务端）的顺序列举如下，稍后将逐一讨论：")]),e._v(" "),r("ul",[r("li",[r("strong",[e._v("浏览器缓存")]),e._v("（Browser Cache）：讨论HTTP协议的缓存设计，强缓存与协商缓存的工作和失效模式。")]),e._v(" "),r("li",[r("strong",[e._v("DNS缓存")]),e._v("（DNS Cache）：讨论DNS预解析、DNS缓存通讯、失效原理和问题，HTTP DNS对比Local DNS的优点。")]),e._v(" "),r("li",[r("strong",[e._v("链路优化")]),e._v("（Transmission Optimization）：讨论HTTP/1.1时代的节流措施，HTTP2时代的协议升级协商，多路复用、Header压缩、内容压缩。")]),e._v(" "),r("li",[r("strong",[e._v("内容分发网络")]),e._v("（Content Distribution Network）：讨论从CDN到边缘计算；CDN的回源、范围、失效控制、访问控制；CDN的TLS优化。")]),e._v(" "),r("li",[r("strong",[e._v("负载均衡器")]),e._v("（Load Balancer）：讨论四至七层负载均衡，均衡算法。")]),e._v(" "),r("li",[r("strong",[e._v("反向代理")]),e._v("（Reverse Proxy）：讨论反向代理的缓存、动静分离、限流、跨域 、鉴权等方面的应用。")]),e._v(" "),r("li",[r("strong",[e._v("Web中间件")]),e._v("（Web/App Server）：讨论数据缓存、方法缓存 / 进程内外、分布式缓存等。")]),e._v(" "),r("li",[r("strong",[e._v("数据库服务器")]),e._v("（Database Server）：讨论数据库集群的七层代理，查询缓存，读写分离，链接多路复用等。")])]),e._v(" "),r("h2",{attrs:{id:"浏览器缓存"}},[e._v("浏览器缓存")]),e._v(" "),r("p",[e._v("浏览器的缓存机制几乎是在万维网刚刚出现就已经存在，在HTTP协议设计之初，便确定了服务端与客户端之间“无状态”（Stateless）的交互原则，即要求每次请求是独立的，每次请求无法感知和依赖另一个请求的存在，这极大地简化了HTTP服务器的设计难度，也为其水平扩展能力留下了广袤的空间。但无状态并不只有好的一面，由于每次请求都是独立的，服务端不保存此前请求的状态和资源，所以也不可避免地会携带重复的数据，造成网络性能降低。HTTP协议对此的解决方案就是客户端缓存，在HTTP/1.0和HTTP/1.1协议中，都设计有现在被称为“状态缓存”、“强制缓存”和“协商缓存”的缓存机制。")]),e._v(" "),r("p",[e._v("其中，状态缓存是指不经过服务器，直接对目标网站的状态判断，以前只有301/Moved Permanently（永久重定向）这一个；后来在"),r("a",{attrs:{href:"https://tools.ietf.org/html/rfc6797",target:"_blank",rel:"noopener noreferrer"}},[e._v("RFC6797"),r("OutboundLink")],1),e._v("中增加了"),r("a",{attrs:{href:"https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security",target:"_blank",rel:"noopener noreferrer"}},[e._v("HSTS"),r("OutboundLink")],1),e._v("（HTTP Strict Transport Security）机制，用于避免依赖301/302跳转HTTPS时可能产生的降级劫持（详细可见安全架构中的“"),r("RouterLink",{attrs:{to:"/architect-perspective/general-architecture/system-security.html#传输"}},[e._v("传输")]),e._v("”），这也属于一种状态缓存。由于状态缓存所涉内容甚少，后续我们就只讨论强制缓存与协商缓存两种机制。")],1),e._v(" "),r("h3",{attrs:{id:"强制缓存"}},[e._v("强制缓存")]),e._v(" "),r("p",[e._v("只要是缓存，几乎都不可避免地会遇到一致性的问题。强制缓存对一致性处理就如它的名字一样，显得十分的粗暴，假设在某个时间点（譬如10分钟）之内，资源的状态一定不会被改变，因此客户端可以无需经过任何浏览器请求，在该时间点来临前一直持有该资源的副本。")]),e._v(" "),r("p",[e._v("根据约定，强制制缓存在用户在浏览器输入地址、页面链接跳转、新开窗口、前进/后退中均可生效，但在使用F5刷新页面时应当失效。有以下这些HTTP Header可以实现强缓存：")]),e._v(" "),r("ul",[r("li",[r("p",[r("strong",[e._v("Expires")]),e._v("：Expires是HTTP/1.0协议中提供的Header（当然，在HTTP/1.1中同样存在），后面跟随一个截至时间参数。当服务器返回某个资源时带有该Header的话，意味着服务器承诺截止时间之前资源不会发生变动，浏览器可直接缓存该数据，不再重新发请求，示例：")]),e._v(" "),r("div",{staticClass:"language-http extra-class"},[r("pre",{pre:!0,attrs:{class:"language-http"}},[r("code",[r("span",{pre:!0,attrs:{class:"token response-status"}},[e._v("HTTP/1.1 "),r("span",{pre:!0,attrs:{class:"token property"}},[e._v("200 OK")])]),e._v("\n"),r("span",{pre:!0,attrs:{class:"token header-name keyword"}},[e._v("Expires:")]),e._v(" Wed, 21 Oct 2015 07:28:00 GMT\n")])])]),r("p",[e._v("Expires的设计非常直观易懂，但设计考虑得并不周全，它至少存在以下显而易见的问题：")]),e._v(" "),r("ul",[r("li",[e._v("受限于客户端的本地时间。譬如，客户端修改了本地时间，可能会造成缓存提前失效或超期持有。")]),e._v(" "),r("li",[e._v("无法处理涉及到用户身份的私有资源，譬如，某些资源被登录用户缓存在自己的浏览器上是合理的，但如果被CDN服务器缓存起来，则可能被其他未认证的用户所获取。")]),e._v(" "),r("li",[e._v("无法描述“"),r("strong",[e._v("不")]),e._v("缓存”的语义。譬如，浏览器为了提高性能，往往会自动在当次请求中缓存某些MINE类型的资源，在HTTP/1.0的服务器中就缺乏手段强制浏览器不允许缓存某个资源。以前为了实现这类功能，通常不得不通过脚本在资源后面增加时间戳（如“xx.js?t=1586359920”）来保证每次资源都会重新获取。")])])]),e._v(" "),r("li",[r("p",[r("strong",[e._v("Cache-Control")]),e._v("：Cache-Control是HTTP/1.1协议中定义的强制缓存Header，它的语义比起Expires来说就丰富了很多，如果Cache-Control和Expires同时存在，并且语义存在冲突（与max-age和s-maxage冲突）的话，将会以Cache-Control为准。Cache-Control的示例如下：")]),e._v(" "),r("div",{staticClass:"language-http extra-class"},[r("pre",{pre:!0,attrs:{class:"language-http"}},[r("code",[r("span",{pre:!0,attrs:{class:"token response-status"}},[e._v("HTTP/1.1 "),r("span",{pre:!0,attrs:{class:"token property"}},[e._v("200 OK")])]),e._v("\n"),r("span",{pre:!0,attrs:{class:"token header-name keyword"}},[e._v("Cache-Control:")]),e._v(" max-age=600\n")])])]),r("p",[e._v("Cache-Control在客户端的请求头或服务器的响应头中都可以使用，它定义了一系列的参数，且允许扩展（不在标准RFC协议中，由浏览器自行支持），主要包括有：")]),e._v(" "),r("ul",[r("li",[e._v("public / private：指明是否涉及到用户身份的私有资源，如果是public，着可以被代理、CDN等缓存，如果是private，着只能进行私有缓存。")]),e._v(" "),r("li",[e._v("no-cache / no-store：no-cache指明该资源不应该被缓存，哪怕是同一个会话中对同一个URL地址的请求，也应该从服务端获取（但协商缓存机制依然是生效的）。no-store不强制会话中相同URL资源的重复读取，但禁止浏览器、CDN等以任何形式保存该资源。")]),e._v(" "),r("li",[e._v("no-transform：禁止资源被任何形式地修改。譬如，某些CDN、透明代理支持自动GZIP压缩图片或文本，以提升网络性能，而no-transform就禁止了这样的行为，它要求Content-Encoding、Content-Range、Content-Type均不允许进行任何形式的修改。")]),e._v(" "),r("li",[e._v("max-age / s-maxage：max-age后面跟随一个以秒为单位的数字，表明相对于请求时间，多少秒以内缓存有效，资源不需要重新从服务器中获取。相对时间避免了Expires中采用绝对截至时间可能受客户端时钟影响的尴尬。s-maxage中的s是“share”的缩写，意味“共享缓存”有效时间，用于提示CDN这类服务器如何对缓存进行失效。")]),e._v(" "),r("li",[e._v("min-fresh / only-if-cached：这两个参数用于客户端的请求头，min-fresh后续跟随一个以秒为单位的数字，用于希望服务器能返回一个不少于该时间的缓存资源（即包含max-age且不少于min-fresh的数字）。only-if-cached表示客户端要求不发送网络请求，只使用缓存进行响应，若缓存不能命中，则直接返回503/Service Unavailable错误。")]),e._v(" "),r("li",[e._v("must-revalidate / proxy-revalidate：must-revalidate表示在资源过期后，一定需要从服务器中进行验证（即超过了max-age的时间，就等同于no-cache的行为），proxy-revalidate用于提示代理、CDN等缓存服务，语义与must-revalidate一致。")])])]),e._v(" "),r("li",[r("p",[r("strong",[e._v("Pragma")]),e._v("：")])])])])}),[],!1,null,null,null);t.default=s.exports}}]);