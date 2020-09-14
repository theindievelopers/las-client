import React from 'react';
import { Document, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import styled from '@react-pdf/styled-components';
import Logo from '../../img/logo.jpg';
import FooterImg from '../../img/footerimg.png';
import moment from 'moment';

const styles = StyleSheet.create({
  image: {width: 130, height: 27}
});

const Body = styled.Page`
  padding-top: 35px;
  padding-bottom: 40px;
  padding-right: 35px;
  padding-left: 35px;
  border: 1px solid red;
`;

const Border = styled.View`
  border: 2px solid black;
`

const Section = styled.View`
  padding: 5px 8px;
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
  bottom: 20px;
  font-size: 11px;
  position: absolute;
  // text-align: center;
`;

// Create Document Component
const StaffPDF = React.memo(({ 
    name, department, departureDate, employeeNum, position, returnDate,contactNum, typeOfLeave, handOverSuccessor,handOverSuccessorName,handOverSuccessorCode,
    handOverDocsCode,handOverDocsName,itemIssued,itemIssued2,itemIssued3,itemIssued4,itemRemarks,itemRemarks2,itemRemarks3,itemRemarks4,recievedTicket,recievedSettlement,
    recievedOthers,leaveFrom,leaveTo,backOn,employeeSignature,recievedOthersRemarks,
    employeeSignDate,airportDepartureDate,airportArrivalDate,airportAccommodation,airportMobile, accountingCode, ceoCode, cooCode, hraManagerCode, logisticsOfficerCode, 
    projectManagerCode,immediateSuperiorCode, ceoSign, cooSign, acctSign, hraSign, logisticsSign, immidiateSupSign, projectManagerSign,handOverDocs, 
    ceoSignDate, cooSignDate, acctSignDate, hraSignDate, logisticsSignDate, immidiateSupSignDate, projectManagerSignDate,
    ...props 
  }) => (
  <Document>
    <Body size="A4" wrap>
      <Border>
        <Header fixed>
          <Image 
            src={Logo}
            style={styles.image}
          />
        </Header>
        <Title style={{ borderTop: 1, borderBottom: 1, }}>Staff Leave Clearance</Title>
        <Section>
          <Row>
            <View>
              <Label1>Name:</Label1>
              <Label1>Project/Department:</Label1>
              <Label1>Departure Date:</Label1>
              <Label1>Type of Leave:</Label1>
            </View>
            <View>
              <Input1 style={{ borderBottom: 1, alignContent: 'center' }}>{name === "" ? " " : name}</Input1>
              <Input1 style={{ borderBottom: 1 }}>{department === "" ? " " : department}</Input1>
              <Input1 style={{ borderBottom: 1 }}>{departureDate === "" ? " " : moment(departureDate).format("MM/DD/YYYY")}</Input1>
            </View>
            <View style={{ paddingLeft: "10px" }}>
              <Label2>Employee No.:</Label2>
              <Label2>Position:</Label2>
              <Label2>Return Date:</Label2>
              <Label2>Contact No.:</Label2>
            </View>
            <View>
              <Input2 style={{ borderBottom: 1 }}>{employeeNum === "" ? " " : employeeNum}</Input2>
              <Input2 style={{ borderBottom: 1 }}>{position === "" ? " " : position}</Input2>
              <Input2 style={{ borderBottom: 1 }}>{returnDate === "" ? " " : moment(returnDate).format("MM/DD/YYYY")}</Input2>
              {contactNum === "" ? 
                <Input2 style={{ borderBottom: 1, color: "white" }}>09201234567</Input2>
                : 
                <Input2 style={{ borderBottom: 1 }}>{contactNum}</Input2>
              }
              <Span>(Designation)</Span>
            </View>
          </Row>
          <Row style={{ paddingLeft: "5px", paddingBottom: "0px", paddingTop: 0 }}>
            <View style={{ paddingLeft: "20px" }}>
              <Row>
                <CheckBox>{typeOfLeave === 'Annual' ? "X" : " "}</CheckBox>
                <CheckBoxLabel>Annual</CheckBoxLabel>
              </Row>
            </View>
            <View style={{ paddingLeft: "20px" }}>
              <Row>
                <CheckBox>{typeOfLeave === 'Unpaid' ? "X" : " "}</CheckBox>
                <CheckBoxLabel>Unpaid</CheckBoxLabel>
              </Row>
            </View>
            <View style={{ paddingLeft: "20px" }}>
              <Row>
                <CheckBox>{typeOfLeave === 'Sick' ? "X" : " "}</CheckBox>
                <CheckBoxLabel>Sick</CheckBoxLabel>
              </Row>
            </View>
            <View style={{ paddingLeft: "20px" }}>
              <Row>
                <CheckBox>{typeOfLeave === 'Emergency' ? "X" : " "}</CheckBox>
                <CheckBoxLabel>Emergency</CheckBoxLabel>
              </Row>
            </View>
          </Row>
          <Label1 style={{ width: "200px" }}>A. Handling Over of Duties & Responsibilities</Label1>
          <Row style={{ paddingLeft: "5px", paddingTop: "0px" }}>
            <View style={{ paddingLeft: "0px" }}>
              <Row>
                <CheckBox>{handOverSuccessor ? "X" : " "}</CheckBox>
                <CheckBoxLabel>Handover briefing to successor</CheckBoxLabel>
              </Row>
            </View>
            <View style={{ paddingLeft: "30px" }}>
              <Row>
                <Text style={{ fontSize: 9, paddingLeft: "3px", paddingTop: "1px" }}>Name/Employee No.</Text>
                <Text style={{ textAlign: "center", borderBottom: 1, fontSize: 9, width: 220, marginLeft: "5px" }}>
                  {handOverSuccessorName}
                </Text>
              </Row>
            </View>
          </Row>
          <Row style={{ paddingLeft: "5px", paddingTop: "1px" }}>
            <View style={{ paddingLeft: "0px" }}>
              <Row>
                <CheckBox>{handOverDocs ? "X" : " "}</CheckBox>
                <CheckBoxLabel style={{ width: "127px" }}>Handover documents</CheckBoxLabel>
              </Row>
            </View>
            <View style={{ paddingLeft: "35px" }}>
              <Row>
                <Text style={{ fontSize: 9, paddingLeft: "3px", paddingTop: "1px" }}>Name/Employee No.</Text>
                <Text style={{ textAlign: "center", borderBottom: 1, fontSize: 9, width: 220, marginLeft: "5px" }}>
                  {handOverDocsName}
                </Text>
              </Row>
            </View>
          </Row>
          <Label1 style={{ width: "200px" }}>B. Items Issued</Label1>
          <Row style={{ paddingLeft: "5px", paddingTop: "0px" }}>
            <View style={{ paddingLeft: "0px" }}>
              <Row>
                <Text style={{ textAlign: "center", borderBottom: 1, fontSize: 9, width: 220, marginLeft: "5px" }}>
                  {itemIssued ? itemIssued : " "}
                </Text>
              </Row>
            </View>
            <View style={{ paddingLeft: "35px" }}>
              <Row>
                <Text style={{ textAlign: "center", borderBottom: 1, fontSize: 9, width: 220, marginLeft: "5px" }}>
                  {itemIssued2 ? itemIssued2 : " "}
                </Text>
              </Row>
            </View>
          </Row>
          <Row style={{ paddingLeft: "5px", paddingTop: "1px" }}>
            <View style={{ paddingLeft: "0px" }}>
              <Row>
                <Text style={{ textAlign: "center", borderBottom: 1, fontSize: 9, width: 220, marginLeft: "5px" }}>
                  {itemIssued3 ? itemIssued3 : " "}
                </Text>
              </Row>
            </View>
            <View style={{ paddingLeft: "35px" }}>
              <Row>
                <Text style={{ textAlign: "center", borderBottom: 1, fontSize: 9, width: 220, marginLeft: "5px"}}>
                  {itemIssued4 ? itemIssued4 : " "}
                </Text>
              </Row>
            </View>
          </Row>
          <Label1 style={{ width: "200px" }}>Remarks:</Label1>
          <Row style={{ paddingLeft: "5px", paddingTop: "0px" }}>
            <View style={{ paddingLeft: "0px" }}>
              <Row>
                <Text style={{ textAlign: "center", borderBottom: 1, fontSize: 9, width: 220, marginLeft: "5px" }}>
                  {itemRemarks ? itemRemarks : " "}
                </Text>
              </Row>
            </View>
            <View style={{ paddingLeft: "35px" }}>
              <Row>
                <Text style={{ textAlign: "center", borderBottom: 1, fontSize: 9, width: 220, marginLeft: "5px" }}>
                  {itemRemarks2 ? itemRemarks2 : " "}
                </Text>
              </Row>
            </View>
          </Row>
          <Row style={{ paddingLeft: "5px", paddingTop: "1px" }}>
            <View style={{ paddingLeft: "0px" }}>
              <Row>
                <Text style={{ textAlign: "center", borderBottom: 1, fontSize: 9, width: 220, marginLeft: "5px" }}>
                  {itemRemarks3 ? itemRemarks3 : " "}
                </Text>
              </Row>
            </View>
            <View style={{ paddingLeft: "35px" }}>
              <Row>
                <Text style={{ textAlign: "center", borderBottom: 1, fontSize: 9, width: 220, marginLeft: "5px" }}>
                  {itemRemarks4 ? itemRemarks4 : " "}
                </Text>
              </Row>
            </View>
          </Row>
          <Row style={{ paddingTop: "10px", paddingBottom: "0px", justifyContent: "center" }}>
            <View style={{}}>
              <Text style={{ textAlign: "center", fontSize: 9, width: 220 }}>
                {logisticsSign ?
                  <View>
                    <Image source={"http://localhost:3000/fetch/signature?code=" + logisticsOfficerCode} style={{width: 130,height: 20}}/> 
                    <Text>{moment(logisticsSignDate).format("MM/DD/YYYY")}</Text>
                  </View>
                  : 
                  <Text style={{ textAlign: "center", borderBottom: 1, fontSize: 20, width: 220, marginLeft: "5px", color: "white" }}>
                    Placeholder
                  </Text>
                }
              </Text>
              <Text style={{ textAlign: "center", borderTop: 1, fontSize: 9, width: 220, paddingTop: "2px" }}>
                Logistics Officer Signature & Date
              </Text>
            </View>
            <View style={{ paddingLeft: "20px" }}>
              <Text style={{ textAlign: "center", fontSize: 9, width: 220 }}>
                {immidiateSupSign ? 
                  <View>
                    <Image source={"http://localhost:3000/fetch/signature?code=" + immediateSuperiorCode} style={{width: 130, height: 20}}/>
                    <Text>{moment(immidiateSupSignDate).format("MM/DD/YYYY")}</Text>
                  </View>
                  :
                  <Text style={{ textAlign: "center", borderBottom: 1, fontSize: 20, width: 220, marginLeft: "5px", color: "white" }}>
                    Placeholder
                  </Text>
                }
              </Text>
              <Text style={{ textAlign: "center", borderTop: 1, fontSize: 9, width: 220, paddingTop: "2px" }}>
                Immediate Supervisor/Manager Signature & Date
              </Text>
            </View>
          </Row>
        </Section>
        <SubTitle style={{ borderTop: 1, borderBottom: 1 }}>Approval/Noted</SubTitle>
        <Section>
          <Row style={{ paddingTop: "0px", paddingBottom: "0px", justifyContent: "center" }}>
            <View style={{}}>
              <Text style={{ textAlign: "center", fontSize: 9, width: 220 }}>
                {projectManagerSign ?
                  <View>
                    <Image source={"http://localhost:3000/fetch/signature?code=" + projectManagerCode} style={{width: 130,height: 20}}/>
                    <Text>{moment(projectManagerSignDate).format("MM/DD/YYYY")}</Text>
                  </View>
                  :
                  <Text style={{ textAlign: "center", borderBottom: 1, fontSize: 20, width: 220, marginLeft: "5px", color: "white" }}>
                    Placeholder
                  </Text>
                }
              </Text>
              <Text style={{ textAlign: "center", borderTop: 1, fontSize: 9, width: 220, paddingTop: "2px" }}>
                Immediate Supervisor/Signature and Date
              </Text>
            </View>
            <View style={{ paddingLeft: "20px" }}>
              <Text style={{ textAlign: "center", fontSize: 9, width: 220 }}>
                {acctSign ? 
                  <View>
                    <Image source={"http://localhost:3000/fetch/signature?code=" + accountingCode} style={{width: 130,height: 20}}/>
                    <Text>{moment(acctSignDate).format("MM/DD/YYYY")}</Text>
                  </View>
                  : 
                  <Text style={{ textAlign: "center", borderBottom: 1, fontSize: 20, width: 220, marginLeft: "5px", color: "white" }}>
                    Placeholder
                  </Text>
                }
              </Text>
              <Text style={{ textAlign: "center", borderTop: 1, fontSize: 9, width: 220, paddingTop: "2px" }}>
                Accounting Department's Signature and Date
              </Text>
            </View>
          </Row>
        </Section>
        <SubTitle style={{ borderTop: 1, borderBottom: 1 }}>Employee Affidavit</SubTitle>
        <Section>
          <Paragraph>
            I hereby declare that all the items issued to me by BGC were returned to the staff-in-charge
            and recieve the following:
          </Paragraph>
          <Row style={{ paddingTop: "4px" }}>
            <View>
              <Row>
                <CheckBox>{recievedTicket ? "X" : " "}</CheckBox>
                <CheckBoxLabel>Ticket</CheckBoxLabel>
              </Row>
            </View>
            <View style={{ paddingLeft: "80px" }}>
              <Row>
                <CheckBox>{recievedSettlement ? "X" : " "}</CheckBox>
                <CheckBoxLabel>Settlement</CheckBoxLabel>
              </Row>
            </View>
            <View style={{ paddingLeft: "50px" }}>
              <Row>
                <CheckBox>{recievedOthers ? "X" : " "}</CheckBox>
                <CheckBoxLabel>Others:</CheckBoxLabel>
                <Text style={{ textAlign: "center", borderBottom: 1, fontSize: 9, width: 170, marginLeft: "5px" }}>
                  {recievedOthersRemarks ? recievedOthersRemarks : " "}
                </Text>
              </Row>
            </View>
          </Row>
          <Row style={{ paddingTop: "5px" }}>
            <Paragraph>
              This is to confirm that I will be on leave from
            </Paragraph>
            <Text style={{ textAlign: "center", borderBottom: 1, fontSize: 9, width: 100, marginLeft: "5px" }}>
              {moment(airportDepartureDate).format("MM/YY/DDDD")}
            </Text>
            <Paragraph> to</Paragraph>
            <Text style={{ textAlign: "center", borderBottom: 1, fontSize: 9, width: 100, marginLeft: "5px" }}>
              {moment(airportArrivalDate).format("MM/YY/DDDD")}
            </Text>
            <Paragraph>
              and certify that I will be
            </Paragraph>
          </Row>
          <Row style={{ paddingTop: "2px" }}>
            <Paragraph> back on</Paragraph>
            <Text style={{ textAlign: "center", borderBottom: 1, fontSize: 9, width: 100, marginLeft: "5px" }}>
              {moment(backOn).format("MM/DD/YYYY")}
            </Text>
          </Row>
          <View style={{ paddingTop: "5px" }}>
            <Paragraph style={{ lineHeight: "1.2" }}>
              It is understood that my leave is still part of my employment with BGC. As per Qatar Labour Law,
              absence without legitimate cause of sever (7) consecutive days or fifteen (15 days) is a year will
              will result to the termination of my services and disqualification for the end of service gratuity.
            </Paragraph>
          </View>
          <RowEnd style={{ paddingBottom: "0px", paddingTop: "0px" }}>
            <View style={{ marginRight: "30px" }}>
              <Text style={{ textAlign: "center", fontSize: 9, width: 100 }}>
                {/* <Image source={"http://128.199.121.153:3000/fetch/signature?code=" + employeeNum} style={{width: 130, height: 20}}/> */}
                <Image source={"http://localhost:3000/fetch/signature?code=" + employeeNum} style={{width: 130, height: 20}}/>
              </Text>
              <Text style={{ textAlign: "center", borderTop: 1, fontSize: 9, width: 120, paddingTop: "2px" }}>
                Employee Signature
              </Text>
            </View>
            <View style={{ paddingTop: "10px" }}>
              <Text style={{ textAlign: "center", fontSize: 9, width: 100 }}>
                {employeeSignDate === "" ? " " : moment(employeeSignDate).format("MM/DD/YYYY")}
              </Text>
              <Text style={{ textAlign: "center", borderTop: 1, fontSize: 9, width: 80, paddingTop: "2px" }}>
                Date
              </Text>
            </View>
          </RowEnd>
        </Section>
        <SubTitle style={{ borderTop: 1, borderBottom: 1, fontSize: 10  }}>Request For Airport Transportation</SubTitle>
        <Section>
          <Row>
            <View style={{width: 300, paddingLeft: "30px"}}>
              <Row>
                <CheckBox>{airportDepartureDate === "" ? " " : "X"}</CheckBox>
                <CheckBoxLabel>Departure Date:</CheckBoxLabel>
                <Text style={{ textAlign: "center", borderBottom: 1, fontSize: 9, width: 200, marginLeft: "5px", paddingTop: "3px" }}>
                  {airportDepartureDate === "" ? " " : moment(airportDepartureDate).format("MM/DD/YYYY")}
                </Text>
              </Row>
            </View>
            <View style={{width: 100, paddingLeft: "30px"}}>
              <Row>
                <CheckBox>{airportArrivalDate === "" ? " " : "X"}</CheckBox>
                <CheckBoxLabel>Arrival Date:</CheckBoxLabel>
                <Text style={{ textAlign: "center", borderBottom: 1, fontSize: 9, width: 90, marginLeft: "5px", paddingTop: "3px" }}>
                  {airportArrivalDate === "" ? " " : moment(airportArrivalDate).format("MM/DD/YYYY")}
                </Text>
              </Row>
            </View>
          </Row>
          <Row>
            <View>
              <Row>
                <Label2>Accomodation:</Label2>
                <Text style={{ textAlign: "center", borderBottom: 1, fontSize: 9, width: 280, marginLeft: "5px", paddingTop: "5px" }}>
                 {airportAccommodation === "" ? " " : airportAccommodation}
                </Text>
              </Row>
            </View>
            <View style={{paddingLeft: 6}}>
              <Row>
              <Label2 style={{width: 50}}>Mobile No.:</Label2>
                <Text style={{ textAlign: "center", borderBottom: 1, fontSize: 9, width: 90, marginLeft: "5px", paddingTop: "5px" }}>
                  {airportMobile === "" ? " " : airportMobile}
                </Text>
              </Row>
            </View>
          </Row>
          <Row>
            <View>
              <Row>
                <Label2 style={{fontSize: 8}}>Guidelines:</Label2>
              </Row>
            </View>
          </Row>
          <View style={{paddingTop: 3, paddingLeft: 15}}>
            <Text style={{fontSize: 8}}>This Clearance Form shoul be arranged by the employee prior to departure of at least:</Text>
            <Row>
                <Text style={{fontSize: 8, marginLeft: 25}}>Annual Leave</Text>
                <Text style={{fontSize: 8, marginLeft: 200}}>5 working days</Text>
            </Row>
            <Row>
              <Text style={{fontSize: 8, marginLeft: 25}}>End of Service</Text>
              <Text style={{fontSize: 8, marginLeft: 196}}>7 working days</Text>
            </Row>
            <Row>
              <Text style={{fontSize: 8, marginLeft: 25}}>Leave other than the above</Text>
              <Text style={{fontSize: 8, marginLeft: 152}}>1 working day</Text>
            </Row>
          </View>
          <View style={{paddingTop: 3, paddingLeft: 15}}>
            <Text style={{fontSize: 8}}>
              1. This form should be submitted to HR Department upon completion and not on the same travel date.
            </Text>
            <Text style={{fontSize: 8}}>
              2. Staff employees issuing company's vehicle are required to obtain clearance from Logistics.
            </Text>
          </View>
        </Section>
        <SubTitle style={{ borderTop: 1, borderBottom: 1, fontSize: 10 }}>Management</SubTitle>
        <Section>
          <Row style={{ paddingTop: "0px", paddingBottom: "0px" }}>
            <View>
              <Text style={{ fontSize: 11,width: 150, textAlign: "center", paddingBottom: "5px"}}>
                HR Manager
              </Text>
              <Text style={{ textAlign: "center", fontSize: 9, width: 150 }}>
                {hraSign ?
                  <View>
                    <Image source={"http://localhost:3000/fetch/signature?code=" + hraManagerCode} style={{width: 130,height: 20}}/>
                    <Text>{moment(hraSignDate).format("MM/DD/YYYY")}</Text>
                  </View>
                  : 
                  <Text style={{ textAlign: "center", borderBottom: 1, fontSize: 20, width: 220, marginLeft: "5px", color: "white" }}>
                    Placeholder
                  </Text>
                }
              </Text>
              <Text style={{ textAlign: "center", borderTop: 1, fontSize: 9, width: 150, paddingTop: "2px" }}>
                Signature and Date
              </Text>
            </View>
            <View style={{paddingLeft: "25px"}}>
              <Text style={{ fontSize: 11,width: 150, textAlign: "center", paddingBottom: "5px" }}>
                Chief Operating Officer
              </Text>
              <Text style={{ textAlign: "center", fontSize: 9, width: 150 }}>
                {cooSign ? 
                  <View>
                    <Image source={"http://localhost:3000/fetch/signature?code=" + cooCode} style={{width: 130,height: 20}}/>
                    <Text>{moment(cooSignDate).format("MM/DD/YYYY")}</Text>
                  </View>
                  : 
                  <Text style={{ textAlign: "center", borderBottom: 1, fontSize: 20, width: 220, marginLeft: "5px", color: "white" }}>
                    Placeholder
                  </Text>
                }
              </Text>
              <Text style={{ textAlign: "center", borderTop: 1, fontSize: 9, width: 150, paddingTop: "2px" }}>
                Signature and Date
              </Text>
            </View>
            <View style={{paddingLeft: "25px"}}>
              <Text style={{ fontSize: 11,width: 150, textAlign: "center", paddingBottom: "5px" }}>
                Chief Executive Officer
              </Text>
              <Text style={{ textAlign: "center", fontSize: 9, width: 150 }}>
                {ceoSign ? 
                  <View>
                    <Image source={"http://localhost:3000/fetch/signature?code=" + ceoCode} style={{width: 130,height: 20}}/>
                    <Text>{moment(ceoSignDate).format("MM/DD/YYYY")}</Text>
                  </View>
                  : 
                  <Text style={{ textAlign: "center", borderBottom: 1, fontSize: 20, width: 220, marginLeft: "5px", color: "white" }}>
                    Placeholder
                  </Text>
                }
              </Text>
              <Text style={{ textAlign: "center", borderTop: 1, fontSize: 9, width: 150, paddingTop: "2px" }}>
                Signature and Date
              </Text>
            </View>
          </Row>
        </Section>
      </Border>
      <Footer 
        fixed>
            BGC-F-HRM14B V2.0, 21/12/2019                        Page 1/1                                                    <Image src={FooterImg} style={{width: 100, height: 20}} fixed/>
      </Footer>
    </Body>
  </Document>
));

export default StaffPDF;