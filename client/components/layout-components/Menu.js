import { Menu} from 'antd'
import { useRouter } from 'next/router'
import AppContext from "../../context/AppContext";
import { DashboardOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { useContext } from "react";
// import e from 'express';

const stockCompanies = [
  {companyname:"Agilent Technologies, Inc",symbol:"A"},
  {companyname:"ATA Creativity Global",symbol:"AACG"},
  {companyname:"American Airlines Group, Inc",symbol:"AAL"},
  {companyname:"Altisource Asset Management Corp",symbol:"AAMC"},
  {companyname:"Acer Therapeutics Inc",symbol:"ACER"},

]
const menu = stockCompanies.map(company => <Menu.Item key={company.companyname}>
    <a>
    <DashboardOutlined />
      <span>{company.companyname}</span>
    </a>
</Menu.Item>);
  

export default function mennu ({ style, closeDrawer }) {
  const router = useRouter()
  // const currentPath = router.route
  // let selectedKeys = []
  const { isAuthenticated } = useContext(AppContext);
  const { symbol, setSymbol } = useContext(AppContext);

  // for (let i = keys.length - 1; i >= 0; i--) {
  //   if (currentPath.includes(keys[i])) {
  //     selectedKeys = [keys[i]]
  //     break
  //   }
  // }
  const handleClick = (s)=> {
    setSymbol(s)
  }
  return (
    <Menu
      theme="dark"
      mode="inline"
      // selectedKeys={selectedKeys}
      style={{ ...style, padding: '16px 0' }}
      onClick={({ key }) => {
        closeDrawer()
        setSymbol(key)
      }}
    >
  {isAuthenticated && stockCompanies.map(company => <Menu.Item key={company.symbol}  >
    <div>
    <span>{company.symbol}</span>
    </div>
</Menu.Item>)}
    </Menu>
  )
}
