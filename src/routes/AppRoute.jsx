import { Route, Routes } from "react-router-dom"
import { HomePage } from "../features/home/HomePage"
import { NewsIndexPage } from "../features/news/pages/NewsIndexPage"

export const AppRoute = () => {
  return (
    <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/news" element={<NewsIndexPage/>}/>
    </Routes>
  )
}
