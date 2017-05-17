import Header from './Header'
import Head from './Head'

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
}

const Layout = ({children, title}) => (
  <div style={layoutStyle}>
    <Head title={title}/>
    <Header />
    {children}
  </div>
)

export default Layout
