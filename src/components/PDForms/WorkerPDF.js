import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import styled from '@react-pdf/styled-components';

const Body = styled.Page`
  padding-top: 35px;
  padding-bottom: 65px;
  padding-right: 35px;
  padding-left: 35px;
  border: 1px solid red;
`;

const Border = styled.View`
  border: 2px solid black;
`

const Section = styled.View`
  padding: 8px;
`
const Row = styled.View`
  display: flex;
  flex-direction: row;
`

const RowEnd = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

const Header = styled.Text`
  color: grey;
  font-size: 12px;
//   margin-bottom: 20px;
  height: 40px;
  padding: 5px;
`;

const Title = styled.Text`
  font-size: 12px;
  text-align: center;
  padding: 2px;
  background-color: #6da9e3;
  font-weight: bolder;
  text-transform: uppercase;
`;

const SubTitle = styled.Text`
  font-size: 11px;
  text-align: center;
  padding: 2px;
  background-color: #E0E0E0;
  text-transform: uppercase;
`

const Label1 = styled.Text`
  font-size: 9px;
  width: 110px;
  padding-top: 5px;
`

const Label2 = styled.Text`
  font-size: 9px;
  width: 65px;
  padding-top: 5px;
`

const Input1 = styled.Text`
  width: 210px;
  font-size: 9px;
  padding-top: 5px;
`

const Input2 = styled.Text`
  width: 105px;
  font-size: 9px;
  padding-top: 5px;
`

const Span = styled.Text`
  font-size: 9px;
  width: 80px;
  text-align: center;
`

const CheckBox = styled.Text`
  width: 23px;
  font-size: 9px;
  height: 14px;
  padding-top: 2px;
  padding-left: 8px;
  border: 1px solid black;
`

const CheckBoxLabel = styled.Text`
  font-size: 9px;
  padding-left: 3px;
  padding-top: 1px;
`
const Paragraph = styled.Text`
  font-size: 9px;
`

const Footer = styled.Text`
  left: 35px;
  right: 35px;
  bottom: 30px;
  font-size: 11px;
  position: absolute;
  // text-align: center;
`;

// Create Document Component
const WorkerPDF = ({ name, department, departureDate, employeeNum, position, returnDate, contactNum,typeOfLeave,itemIssued, ...props }) => (
  <Document>
    <Body size="A4" wrap>
      <Border>
        <Header fixed>
          BOOM GENERAL CONTRACTORS
      </Header>
        <Title style={{borderTop: 1, borderBottom: 1,}}>Worker Leave Clearance</Title>
        <Section>
          <Row>
            <View>
              <Label1>Name:</Label1>
              <Label1>Department / Project:</Label1>
              <Label1>Departure Date:</Label1>
              <Label1>Type of Leave</Label1>
            </View>
            <View>
              <Input1 style={{borderBottom: 1, alignContent: 'center'}}>{name}</Input1>
              <Input1 style={{borderBottom: 1}}>{department}</Input1>
              <Input1 style={{borderBottom: 1}}>{departureDate}</Input1>
            </View>
            <View style={{ paddingLeft: "10px" }}>
              <Label2>Employee No.:</Label2>
              <Label2>Position:</Label2>
              <Label2>Return Date:</Label2>
              <Label2>Contact No.:</Label2>
            </View>
            <View>
              <Input2 style={{borderBottom: 1}}>{employeeNum}</Input2>
              <Input2 style={{borderBottom: 1}}>{position}</Input2>
              <Input2 style={{borderBottom: 1}}>{returnDate}</Input2>
              <Input2 style={{lineHeight: "0.8", borderBottom: 1}}>{contactNum}</Input2>
              <Span>(Designation)</Span>
            </View>
          </Row>
          <Row style={{paddingLeft: "20px", paddingTop: "10px", paddingBottom: "8px"}}>
            <View style={{paddingLeft: "20px"}}>
              <Row>
                <CheckBox>{typeOfLeave === 'annual' ? "X" : " "}</CheckBox>
                <CheckBoxLabel>Annual</CheckBoxLabel>
              </Row>
            </View>
            <View style={{paddingLeft: "20px"}}>
              <Row>
                <CheckBox></CheckBox>
                <CheckBoxLabel>Unpaid</CheckBoxLabel>
              </Row>
            </View>
            <View style={{paddingLeft: "20px"}}>
              <Row>
                <CheckBox></CheckBox>  
                <CheckBoxLabel>Sick</CheckBoxLabel>
              </Row>
            </View>
            <View style={{paddingLeft: "20px"}}>
              <Row>
                <CheckBox></CheckBox>    
                <CheckBoxLabel>Emergency</CheckBoxLabel>
              </Row>
            </View>
          </Row>
          <Label1>A. Items Issued</Label1>
          <Row style={{paddingLeft: "20px", paddingTop: "10px"}}>
            <View style={{paddingLeft: "20px"}}>
              <Row>
                <CheckBox>{itemIssued === 'tools' ? "X" : " "}</CheckBox>
                <CheckBoxLabel>Tools</CheckBoxLabel>
              </Row>
            </View>
            <View style={{paddingLeft: "28px"}}>
              <Row>
                <CheckBox></CheckBox>
                <CheckBoxLabel>Equipment</CheckBoxLabel>
              </Row>
            </View>
            <View style={{paddingLeft: "30px"}}>
              <Row>
                <Text style={{fontSize: 9, paddingLeft: "3px", paddingTop: "1px"}}>Others (Specify)</Text>
                <Text style={{ textAlign: "center",borderBottom: 1, fontSize: 9, width: 120, marginLeft: "5px"}}>
                
                </Text>
              </Row>
            </View>
          </Row>
          <Row style={{alignItems: "center", justifyContent: "center", paddingTop: "50px", paddingBottom: "10px"}}>
            <View>
              <Text style={{ textAlign: "center", fontSize: 9, width: 220}}>
                Placeholder
              </Text>
              <Text style={{ textAlign: "center", borderTop: 1, fontSize: 9, width: 230, paddingTop: "2px"}}>
                  Signature and Date
              </Text>
            </View>
          </Row>
        </Section>
        <SubTitle style={{borderTop: 1, borderBottom: 1}}>Approval/Noted</SubTitle>
        <Section>
          <Row style={{paddingTop: "20px", paddingBottom: "15px", justifyContent: "center"}}>
            <View style={{}}>
              <Text style={{ textAlign: "center", fontSize: 9, width: 220}}>
                asdasd
              </Text>
              <Text style={{ textAlign: "center", borderTop: 1, fontSize: 9, width: 220,paddingTop: "2px"}}>
                Immediate Supervisor/Signature and Date
              </Text>
            </View>
            <View style={{paddingLeft: "20px"}}>
              <Text style={{ textAlign: "center", fontSize: 9, width: 220}}>
                asdfad
              </Text>
              <Text style={{ textAlign: "center", borderTop: 1, fontSize: 9, width: 220,paddingTop: "2px"}}>
                Accounting Department's Signature and Date
              </Text>
            </View>
          </Row>
        </Section>
        <SubTitle style={{borderTop: 1, borderBottom: 1}}>Employee Affidavit</SubTitle>
        <Section>
          <Paragraph>
            I hereby declare that all the items issued to me by BGC were returned to the staff-in-charge
            and recieve the following:
          </Paragraph>
          <Row style={{paddingTop: "4px"}}>
            <View>
              <Row>
                <CheckBox></CheckBox>
                <CheckBoxLabel>Passport</CheckBoxLabel>
              </Row>
            </View>
            <View style={{paddingLeft: "30px"}}>
              <Row>
                <CheckBox></CheckBox>
                <CheckBoxLabel>Ticket</CheckBoxLabel>
              </Row>
            </View>
            <View style={{paddingLeft: "30px"}}>
              <Row>
                <CheckBox></CheckBox>
                <CheckBoxLabel>Settlement</CheckBoxLabel>
              </Row>
            </View>
            <View style={{paddingLeft: "30px"}}>
              <Row>
                <CheckBox></CheckBox>
                <CheckBoxLabel>Others:</CheckBoxLabel>
                <Text style={{ textAlign: "center",borderBottom: 1, fontSize: 9, width: 170, marginLeft: "5px"}}>
                
                </Text>
              </Row>
            </View>
          </Row>
          <Row style={{paddingTop: "10px"}}>
            <Paragraph>
              This is to confirm that I will be on leave from
            </Paragraph>
            <Text style={{ textAlign: "center",borderBottom: 1, fontSize: 9, width: 100, marginLeft: "5px"}}>
                  
            </Text>
            <Paragraph> to</Paragraph>
            <Text style={{ textAlign: "center",borderBottom: 1, fontSize: 9, width: 100, marginLeft: "5px"}}>
                  
            </Text>
            <Paragraph>
              and certify that I will be
            </Paragraph>
          </Row>
          <Row style={{paddingTop: "4px"}}>
            <Paragraph> back on</Paragraph>
            <Text style={{ textAlign: "center",borderBottom: 1, fontSize: 9, width: 100, marginLeft: "5px"}}>
              
            </Text>
          </Row>
          <View style={{paddingTop: "10px"}}>
            <Paragraph style={{lineHeight: "1.2"}}>
              It is understood that my leave is still part of my employment with BGC. As per Qatar Labour Law, 
              absence without legitimate cause of sever (7) consecutive days or fifteen (15 days) is a year will 
              will result to the termination of my services and disqualification for the end of service gratuity.
            </Paragraph>
          </View>
          <RowEnd style={{paddingBottom: "5px", paddingTop: "80px"}}>
            <View style={{marginRight: "30px"}}>
              <Text style={{ textAlign: "center", fontSize: 9, width: 100}}>
                Placeholder
              </Text>
              <Text style={{ textAlign: "center", borderTop: 1, fontSize: 9, width: 120, paddingTop: "2px"}}>
                  Employee Signature
              </Text>
            </View>
            <View>
              <Text style={{ textAlign: "center", fontSize: 9, width: 100}}>
                Placeholder
              </Text>
              <Text style={{ textAlign: "center", borderTop: 1, fontSize: 9, width: 80, paddingTop: "2px"}}>
                  Date
              </Text>
            </View>
          </RowEnd>
        </Section>
        <SubTitle style={{borderTop: 1, borderBottom: 1}}>For BGC Human Resources Use Only</SubTitle>
        <Section>
          <Row style={{paddingTop: "20px", paddingBottom: "20px"}}>
            <View>
              <Text style={{fontSize: 10}}>
                Check and Final Approval by:
              </Text>
            </View>
            <View style={{paddingLeft: "20px"}}>
              <Text style={{ textAlign: "center", fontSize: 9, width: 220}}>
                Placeholder
              </Text>
              <Text style={{ textAlign: "center", borderTop: 1, fontSize: 9, width: 230, paddingTop: "2px"}}>
                  HRA Manager Signature and Date
              </Text>
            </View>
          </Row>
        </Section>
      </Border>
      <Footer render={({ pageNumber, totalPages }) => (
        `BGC-F-HRM14B V2.0, 21/12/2019                       Page ${pageNumber} / ${totalPages}`
      )} fixed />
    </Body>
  </Document>
);

export default WorkerPDF;