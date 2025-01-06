import { Input } from "antd";
import { SearchOutlined, UserOutlined } from '@ant-design/icons';  // Import đúng cách các icon

function Navbar() {
  return (
    <div className=" pt-4">
      <div className="container p-4 flex items-center justify-between">
        <div className="text-white text-2xl font-bold">
          <a href="">
          <span>MOVIE</span>
          <span className="text-orange-500">VENNIE</span>
          </a>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center px-[10px] py-[8px] rounded-full ]">
            <Input
              placeholder="Search Movie"
              className=" w-full h-8 bg-gray-600 text-gray-50 rounded-lg border-none"
              suffix={<SearchOutlined className="text-gray-400" />}
            />
          </div>
          <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center">
            <UserOutlined className="text-gray-900" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;  //
   