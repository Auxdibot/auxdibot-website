"use client";
import { useState, useContext, useEffect } from "react";
import { ExpandedContext } from "./DocumentationSidebarContainer";


export function DocumentationSidebarSections() {
    const content = Array.from(document.querySelectorAll("h2[id]").entries()).map(([, el]) => {
        let id = el.id;
        let name = el.textContent || "";
        let children = [];
        let next = el.nextElementSibling;
        while (next && next.tagName != "H2") {
            if (next.tagName == "H3") {
                children.push({ id: next.id, name: next.textContent || "" });
            }
            next = next.nextElementSibling;
        }
        return { id, name, children };
    })
    const contextExpanded = useContext(ExpandedContext);
    const [inView, setInView] = useState<string | null>();
   
    const [intersecting, setIntersecting] = useState<Element[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const newIntersecting: Element[] = intersecting;
            entries.forEach((entry) => {
                if (entry.isIntersecting && !intersecting.find((i) => entry.target.id == i.id)) {
                    newIntersecting.push(entry.target);
                } else if (!entry.isIntersecting && intersecting.find((i) => entry.target.id == i.id)) {
                    newIntersecting.splice(newIntersecting.indexOf(entry.target), 1);
                }
            });

            if (!newIntersecting.every((i) => intersecting.find((j) => j.id == i.id))) {
                setIntersecting(newIntersecting);

            }

            if (intersecting.length > 0) {

                setInView(intersecting.sort((a,b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top)[0].id);
            }
           
        });

        content.forEach(({ id, children }) => {
            const element = document.getElementById(id);
            if (element) {
                observer.observe(element);
            }
            children?.forEach(({ id: childID }) => {
                const childElement = document.getElementById(childID);
                if (childElement) {
                    observer.observe(childElement);
                }
            });
        });

        return () => {
            observer.disconnect();
        };
    }, [content, intersecting]);

    return <ul className={`pl-8 flex flex-col gap-3 my-2 text-lg`}>
        {content.map(({ id, name, children }, index) => {
            return <li key={index} className={"flex flex-col w-full gap-2"}>
                <span className={`font-open-sans flex gap-5 r w-fit pr-4`}>
                    <section className="relative group cursor-pointer w-fit before:hover-underline before:hover:scale-100 before:bg-white" onClick={() => {
                        contextExpanded?.setExpanded(false);
                        window.scroll({ top: (document.getElementById(id)?.offsetTop || 0) - 100, behavior: "smooth" });
                    }}>{name} </section>
                    <div className={`w-2 rounded-xl self-stretch ${inView == id ? 'bg-orange-500' : ""}`} />
                </span>
                {children && children.length > 0 && <ul className={`pl-4 font-roboto text-sm gap-1 flex flex-col`}>
                    {children?.map((child, index) => {
                        return <li className={'cursor-pointer flex gap-5 hover:font-bold'} key={index} onClick={() => {
                            contextExpanded?.setExpanded(false);
                            window.scroll({ top: (document.getElementById(child.id)?.offsetTop || 0) - 100, behavior: "smooth" });
                        }}>{child.name} <div className={`w-2 rounded-xl self-stretch ${inView == child.id ? 'bg-orange-500' : ""}`} /></li>;
                    })}
                </ul>}
            </li>;
        }
        )}
    </ul>;
}
