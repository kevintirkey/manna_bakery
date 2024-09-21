import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #333;
  color: white;
  text-align: center;
  padding: 20px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>Contact us: (123) 456-7890</p>
      <p>Email: contact@mannaholywheat.com</p>
      <p>Address: 123 Bread Street, Bakery City</p>
    </FooterContainer>
  );
};

export default Footer;
