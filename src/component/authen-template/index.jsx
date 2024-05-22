import './index.scss'

export default function AuthenTemplate({children}) {
  return <div className="authen-template">
    <div className="authen-template__form">
        <div className="wrapper">
            {children}
        </div>
    </div>
    <div className="authen-template__background">
        <img src="/background.png" alt="" />
    </div>
  </div>
}