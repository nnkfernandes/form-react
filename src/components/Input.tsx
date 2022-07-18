import React from "react";
import styled from "styled-components";

const Content = styled.div`
  display: flex;
`;

const Title = styled.p`
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 32px;
  text-align: right;
  margin: 0 8px;
  width: 70px;
`;

const StyledInput = styled.input`
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 6px 12px;
  margin: 4px 0;
`;

const StyledTextArea = styled.textarea`
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 6px 12px;
  margin: 4px 0;
`;

const Error = styled.p`
  font-family: "Inter";
  font-style: italic;
  font-weight: 300;
  font-size: 12px;
  line-height: 16px;
  color: #ff3838;
  margin: 0 0 0 85px;
`;

const Input = ({
  title,
  type = "input",
  error,
  ...props
}: {
  title: string;
  type?: "input" | "textarea";
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>) => {
  return (
    <>
      <Content>
        <Title>{title}</Title>
        {type === "input" ? (
          <StyledInput {...props} />
        ) : (
          <StyledTextArea {...props} />
        )}
      </Content>
      <Error>{error}</Error>
    </>
  );
};

export default Input;
