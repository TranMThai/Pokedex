import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/index.tsx'
import Detail from '../pages/Detail/index.tsx'

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/:name' element={<Detail />} />
        </Routes>
    )
}
export default AppRoutes