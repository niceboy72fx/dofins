import React from "react";
import { DatePicker, Select } from "antd";
import styled from "styled-components";
const options = [];
for (let i = 10; i < 36; i++) {
  options.push({
    value: i.toString(36) + i,
    label: i.toString(36) + i,
  });
}
const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const SelectStyled = styled(Select)`
  .ant-select-selector {
    background-color: #333a49 !important;
    border-color: #333a49 !important;
    color: white;
  }
  .ant-select-selection-item {
    background-color: #1a56db !important; /* Change to your desired color */
  }
`;
const DatePickerStyled = styled(DatePicker)`
  background-color: #333a49;
  color: white;
`;

const categories = [
  "Đồ uống - hàng TD",
  "Điện",
  "Ô tô - linh kiện",
  "Y tế",
  "Xây dựng",
  "Vận tải - kho bãi",
  "VLXD",
  "Thủy sản",
  "Thép",
  "Than -KS",
  "Nhựa",
  "Ngân hàng",
  "Mía đường",
  "Hóa chất",
  "Gạo",
  "Dệt may",
  "Dầu khí",
  "Cảnh báo sớm",
  "Công nghệ",
  "Chứng khoán",
  "Chăn nuôi",
  "Cao su",
  "Bảo hiểm",
  "Bán lẻ",
  "BDS nhà ở",
  "BDS KCN",
  "All Industries",
];

const categoryObjects = categories.map((category) => {
  return {
    value: category === "All Industries" ? "" : category,
    label: category,
  };
});

const SearchUI = ({ industries }) => {
  const handleChangeIndustry = (e) => {
    const encodeUrl = encodeURIComponent(e).replace(/%20/g, "%20");
    industries(encodeUrl);
  };

  return (
    <div className="text-white">
      <div className="flex flex-row items-center mt-4">
        <div className="w-full flex flex-row items-center mt-4">
          <div className="px-5 font-bold">Industry</div>
          <Select
            defaultValue="All Industries"
            style={{
              width: 220,
            }}
            allowClear
            options={categoryObjects}
            onChange={handleChangeIndustry}
          />
        </div>
      </div>
    </div>
  );
};
export default SearchUI;
