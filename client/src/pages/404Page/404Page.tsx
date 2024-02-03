import { Link } from 'react-router-dom'

const _404Page = () => {
  return (
    <div className="py-20 text-center">
      <h1 className="text-9xl">404</h1>
      <p className="py-10">Trang bạn đang tìm kiếm không tồn tại!</p>
      <Link to="/" className="text-efun-primary-2b hover:underline hover:text-efun-primary-01">
        Quay về trang chủ
      </Link>
    </div>
  )
}

export default _404Page
