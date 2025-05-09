'use client'
import isAuth from "@/route-guards/isAuth"

function DashboardRoute() {

    return (
        <h1>Hello from dashboard - Authenticated users only</h1>
    )
}

export default isAuth(DashboardRoute)