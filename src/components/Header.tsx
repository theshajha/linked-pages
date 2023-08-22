"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const components: { title: string; href: string; description: string }[] = [
    {
        title: "Inter-Connectivity",
        href: "/",
        description:
            "Measure the strength of links between pages. Identify pages that are not linked to each other.",
    },
    {
        title: "Broken Links",
        href: "/",
        description:
            "Identify and fix broken connections. Broken links are links that point to pages that do not exist.",
    },
    {
        title: "SEO Performance",
        href: "/",
        description:
            "Analyze SEO metrics for better visibility. Identify pages that are not indexed by search engines.",
    },
    {
        title: "Loading Speed",
        href: "/",
        description: "Evaluate the loading speed of pages. Identify pages that are slow to load.",
    },
    {
        title: "Accessibility",
        href: "/",
        description: "Check the accessibility standards. Identify pages that are not accessible to all users.",
    },
    {
        title: "Content Quality",
        href: "/",
        description: "Assess the quality and relevance of content. Identify pages that are not relevant to the topic.",
    },
]

export function PrimaryNav() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Page Mapping</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                                <NavigationMenuLink asChild>
                                    <Link
                                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                        href="/"
                                    >
                                        <div className="mb-2 mt-4 text-lg font-medium">
                                            Page Linking
                                        </div>
                                        <p className="text-sm leading-tight text-muted-foreground">
                                            Understand how pages are interconnected.
                                        </p>
                                    </Link>
                                </NavigationMenuLink>
                            </li>
                            <ListItem href="/docs" title="Ranking">
                                List pages based on how often they are linked.
                            </ListItem>
                            <ListItem href="/docs/installation" title="Re-Ranking">
                                Redefine the importance of a page and its desired rank.
                            </ListItem>
                            <ListItem href="/docs/primitives/typography" title="Exclusion">
                                Lock and exclude pages from the mapping.
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Health Analysis</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            {components.map((component) => (
                                <ListItem
                                    key={component.title}
                                    title={component.title}
                                    href={component.href}
                                >
                                    {component.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="https://github.com/theshajha/linked-pages" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Github
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
