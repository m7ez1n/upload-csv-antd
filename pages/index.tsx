import type { NextPage } from "next";

import {
  Upload,
  UploadProps,
  message,
  Table,
  Space,
  TableColumnProps,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useState } from "react";
import XLSX from "xlsx";

const { Dragger } = Upload;

type ResponseExcel = {
  name: string;
  age: number;
  street: string;
};

const columns: TableColumnProps<ResponseExcel>[] = [
  {
    title: "Nome",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Idade",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Rua",
    dataIndex: "street",
    key: "street",
  },
];

const Home: NextPage = () => {
  const [data, setData] = useState<ResponseExcel[]>();

  const props: UploadProps = {
    name: "file",
    accept: ".csv,.xlsx,.xls",
    maxCount: 1,
    multiple: false,
    beforeUpload: (file) => {
      const isCSV = file.type === "text/csv" || "application/vnd.excel";

      if (!isCSV) {
        message.error(`${file.name} não é um arquivo válido`);
      }

      return isCSV || Upload.LIST_IGNORE;
    },
    onChange(info) {
      const { status } = info.file;

      if (status !== "uploading") {
        let reader = new FileReader();

        reader.onload = (e) => {
          const bstr = e.target!.result;
          const wb = XLSX.read(bstr, { type: "binary" });

          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];

          const data: ResponseExcel[] = XLSX.utils.sheet_to_json(ws);

          console.log("data", data);
          setData(data);
        };

        reader.readAsBinaryString(info.file.originFileObj);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <Space
      size="large"
      direction="vertical"
      style={{ width: "100%", padding: "10rem" }}
    >
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </Dragger>

      <Table dataSource={data} columns={columns} size="small" bordered />
    </Space>
  );
};

export default Home;
