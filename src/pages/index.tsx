import type { NextPage } from "next";
import React from "react";
import styled from "styled-components";
import { Card, Input } from "../components";

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #a5a5a5;
  margin: 8px 0;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  gap: 4px;
  width: 69px;
  height: 36px;
  background: #7b61ff;
  border-radius: 4px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: white;
  border: 0;
  align-self: flex-end;
  cursor: pointer;

  &:disabled {
    background: #f5f5f5;
    color: #c2c2c2;
  }
`;

const TabRow = styled.div`
  display: flex;
`;

const Tab = styled.button<{ active?: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  height: 44px;
  background: #ffffff;
  ${({ active }) => (active ? "box-shadow: inset 0px -3px 0px #5A3FE0;" : "")}
  border: 0;
  cursor: pointer;
`;

const Content = styled.p`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
`;

type TabType = {
  title: string;
  content: string;
  error?: string;
};

const Home: NextPage = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [totalTabs, setTotalTabs] = React.useState(1);
  const [creatingTabs, setCreatingTabs] = React.useState<TabType[]>([
    { title: "", content: "" },
  ]);
  const [createdTabs, setCreatedTabs] = React.useState<TabType[]>([]);
  const [hasSaved, setHasSaved] = React.useState(false);

  React.useEffect(() => {
    const creationArray: TabType[] = [];
    for (let i = 0; i < totalTabs; i++) {
      creationArray.push({ title: "", content: "" });
    }
    setCreatingTabs(creationArray);
  }, [totalTabs]);

  const handleSave = () => {
    setHasSaved(true);
    let allFilled = true;
    creatingTabs.forEach((item) => {
      if (!item.content || !item.title) allFilled = false;
    });
    if (allFilled) setCreatedTabs(creatingTabs);
  };

  return (
    <Wrapper>
      <Card title="Tabs">
        <Input
          title="Núm.tabs"
          value={totalTabs || 0}
          onChange={(e) => {
            setHasSaved(false)
            setTotalTabs(parseInt(e.target.value));
          }}
          error={!totalTabs ? 'Deve haver pelo menos uma aba' : undefined}
        />
        <Divider />
        {[...Array(totalTabs || 1)].map((_, i) => (
          <div key={i}>
            <Input
              title="Título"
              value={creatingTabs?.[i] ? creatingTabs?.[i].title : ""}
              onChange={(e) => {
                const auxArray = [...(creatingTabs || [])];
                auxArray[i].title = e.target.value;
                setCreatingTabs(auxArray);
              }}
              error={
                hasSaved && creatingTabs?.[i] && !creatingTabs?.[i].title
                  ? "É necessário informar o título da aba"
                  : undefined
              }
            />
            <Input
              title="Conteúdo"
              value={creatingTabs?.[i] ? creatingTabs?.[i].content : ""}
              onChange={(e) => {
                const auxArray = [...(creatingTabs || [])];
                auxArray[i].content = e.target.value;
                setCreatingTabs(auxArray);
              }}
              type='textarea'
              error={
                hasSaved && creatingTabs?.[i] && !creatingTabs?.[i].content
                  ? "A necessário informar o conteúdo da aba."
                  : undefined
              }
            />
          </div>
        ))}
        <Button onClick={handleSave}>Salva</Button>
      </Card>
      <Card title="Conteúdo">
        <TabRow>
          {createdTabs?.map((tab, i) => (
            <Tab
              key={i}
              active={i === selectedTab}
              onClick={() => setSelectedTab(i)}
            >
              {tab.title}
            </Tab>
          ))}
        </TabRow>
        {createdTabs?.[selectedTab] && (
          <Content>{createdTabs?.[selectedTab].content}</Content>
        )}
      </Card>
    </Wrapper>
  );
};

export default Home;
