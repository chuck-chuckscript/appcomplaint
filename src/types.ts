export type AuthRestObject = {
    login: string
    password: string
}
export type RegisterRestObject = {
    name: string 
    surname: string
    fathername: string
    login: string
    password: string
    email: string
}

export type RestResponse = {
    status: number
    message: string
    body?: any
}
export type ReportItem = {
    report_id: number
    report_name: string
    report_date: string
    report_status: string
    report_category: string
}
export type SendingReport = {
    title: string,
    details: string
    file: Blob
    category: number
    user: number
    
}
export type ReportItemProps = {
    
}