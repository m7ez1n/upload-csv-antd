import { Typography, Space, Tabs, Tag, Table, TableColumnProps } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import faker from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type ResponseMonitoramento = {
  data: string;
  codigo: string;
  mensagem: string;
  status: "error" | "success";
  projeto: string;
  canal: string;
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
    },
  },
};

const labels = [
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
  "Domingo",
];

const data = {
  labels,
  datasets: [
    {
      label: "Agendamentos com sucesso",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(30, 255, 25, 0.8)",
    },
    {
      label: "Agendamentos com erro",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(255, 45, 35, 0.8)",
    },
  ],
};

const columns: TableColumnProps<ResponseMonitoramento>[] = [
  {
    title: "Data",
    dataIndex: "data",
    key: "data",
  },
  {
    title: "Código",
    dataIndex: "codigo",
    key: "codigo",
  },
  {
    title: "Mensagem",
    dataIndex: "mensagem",
    key: "mensagem",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    filters: [
      {
        text: "Erro",
        value: "error",
      },
      {
        text: "Sucesso",
        value: "success",
      },
    ],
    onFilter: (value, record: ResponseMonitoramento) =>
      record.status.toString().indexOf(value.toString()) === 0,
    render: (status: "error" | "success") => {
      if (status === "error") {
        return <Tag color="red">Erro</Tag>;
      }

      return <Tag color="green">Sucesso</Tag>;
    },
  },
  {
    title: "Projeto",
    dataIndex: "projeto",
    key: "projeto",
  },
  {
    title: "Canal",
    dataIndex: "canal",
    key: "canal",
  },
];

const dataTable: ResponseMonitoramento[] = [
  {
    data: "13/02/2022 às 19:30",
    codigo: "243",
    mensagem: "Erro ao realizar pix",
    status: "error",
    projeto: "ABP02",
    canal: "5",
  },
  {
    data: "15/02/2022 às 19:30",
    codigo: "200",
    mensagem: "Sucesso ao realizar o pix da cliente XXXXXX",
    status: "success",
    projeto: "ABP97",
    canal: "5",
  },
  {
    data: "11/02/2022 às 19:30",
    codigo: "502",
    mensagem: "Erro ao realizar pix",
    status: "error",
    projeto: "ABP02",
    canal: "5",
  },
  {
    data: "13/02/2022 às 19:30",
    codigo: "200",
    mensagem: "Sucesso ao agendar pix",
    status: "success",
    projeto: "Goleiro",
    canal: "5",
  },
];

const { TabPane } = Tabs;

const Monitoramento = () => {
  return (
    <Space
      direction="vertical"
      size="middle"
      style={{ width: "100%", padding: "10rem" }}
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="Monitoramento" key="1">
          <Typography.Title level={3}>Monitoramento</Typography.Title>
          <Bar options={options} data={data} />
        </TabPane>
        <TabPane tab="Detalhes" key="2">
          <Table
            dataSource={dataTable}
            columns={columns}
            size="small"
            bordered
          />
        </TabPane>
      </Tabs>
    </Space>
  );
};

export default Monitoramento;
