import {useEffect} from 'react'
export function useSeo(title:string,description:string,canonical:string){useEffect(()=>{document.title=title;const desc=document.querySelector<HTMLMetaElement>('meta[name="description"]');if(desc)desc.content=description;const link=document.querySelector<HTMLLinkElement>('link[rel="canonical"]');if(link)link.href=canonical},[title,description,canonical])}
