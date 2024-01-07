
const ConvertLink = (link: string) => {

    // if(link > 50) {
    //     console.log(link);
    // }
    
    // const hasProtocol = link.indexOf("://") > -1;
    // const prefix = hasProtocol ? "" : "https://";
    // const parsedUrl = new URL(prefix + link);
    // const domain = `${parsedUrl.protocol}//${parsedUrl.hostname}/`;
    
    // const subLinkList = (parsedUrl.pathname + parsedUrl.search).split("/");
    // const lengthSubLinkList = subLinkList.length;
    // let lastLink = (subLinkList[1].length > 5 ? subLinkList[1].substring(0, 15) : subLinkList[1]) + "/.../";
    // if(lengthSubLinkList > 3) {
    //     lastLink = lastLink + (subLinkList[lengthSubLinkList-1].length > 15 ? (subLinkList[lengthSubLinkList-1].substring(0, 15) + "...") : subLinkList[lengthSubLinkList-1]);
    // }

    // return domain + lastLink;
}

export default ConvertLink;