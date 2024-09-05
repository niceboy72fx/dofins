import * as React from "react";
import { ConfigProvider, Spin, Table } from "antd";
import styled from "styled-components";
import { Button } from "@mui/material";
import { popUp } from "../../../../state";
import { useRecoilState, useSetRecoilState } from "recoil";
import Util from "../../../../service/helper/util";
import StorageUtil from "../../../../service/helper/storage";
import { useLocation } from "react-router";
import useWebSocket from "../../../../hooks/WebSocketManager";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

const TableStyled = styled(Table)`

`;

const data = [
  { name: 'Q2/2021', capital: 100, profit: 10, growth: 0 },
  { name: 'Q3/2021', capital: 100, profit: 20, growth: 0 },
  { name: 'Q4/2021', capital: 100, profit: 30, growth: 0 },
  { name: 'Q1/2022', capital: 100, profit: 40, growth: 0 },
  { name: 'Q2/2022', capital: 100, profit: 50, growth: 0 },
  { name: 'Q3/2022', capital: 100, profit: 60, growth: 0 },
  { name: 'Q4/2022', capital: 100, profit: 70, growth: 0 },
  { name: 'Q1/2023', capital: 100, profit: 80, growth: 0 },
  { name: 'Q2/2023', capital: 100, profit: 90, growth: 0 },
  { name: 'Q3/2023', capital: 100, profit: 100, growth: 0 },
  { name: 'Q4/2023', capital: 100, profit: 110, growth: 0 },
  { name: 'Q1/2024', capital: 100, profit: 120, growth: 0 },
];


export default function SimpleBarChart() {
  return (<ResponsiveContainer width="100%" height={400}>
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 20, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="2 5" />
      <XAxis dataKey="name" />
      <YAxis />
      {/* <YAxis yAxisId="right" orientation="right" /> */}
      <Tooltip />
      <ReferenceLine y={0} stroke="#000" />

      <Legend />
      <Bar dataKey="capital" fill="#37b24d" name="Vốn điều lệ" />
      <Bar dataKey="profit" fill="#ffc658" name="LNST chưa phân phối" />
      <Bar dataKey="growth" fill="#8884d8" name="Tốc độ tăng trưởng" />
    </BarChart>
  </ResponsiveContainer>)

}
