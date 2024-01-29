export type NavigationProps = {
    links: NavigationLink[]
}
export type NavigationLink = {
    title: string
    routeLink: string

}

export type Store = {
    auth: boolean
}