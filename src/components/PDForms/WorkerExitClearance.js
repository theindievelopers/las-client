import React from "react";
import { Document, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import styled from "@react-pdf/styled-components";
import Logo from "../../img/logo.jpg";
import FooterImg from "../../img/footerimg.png";
import moment from "moment";

const styles = StyleSheet.create({
  image: { width: 130, height: 27 },
  pageBackground: {
    position: "absolute",
    minWidth: "100%",
    minHeight: "100%",
    display: "block",
    height: "100%",
    width: "100%",
  },
});

const Body = styled.Page`
  padding-top: 35px;
  padding-bottom: 55px;
  padding-right: 35px;
  padding-left: 35px;
  border: 1px solid red;
`;

const Border = styled.View`
  border: 2px solid black;
`;

const Section = styled.View`
  padding: 8px;
`;
const Row = styled.View`
  display: flex;
  flex-direction: row;
`;

const RowEnd = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const Header = styled.Text`
  color: grey;
  font-size: 12px;
  //   margin-bottom: 20px;
  // height: 40px;
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
  background-color: #e0e0e0;
  text-transform: uppercase;
`;

const Label1 = styled.Text`
  font-size: 9px;
  // width: 110px;
  padding-top: 5px;
`;

const Label2 = styled.Text`
  font-size: 9px;
  width: 65px;
  padding-top: 5px;
`;

const Input1 = styled.Text`
  // width: 210px;
  font-size: 9px;
  padding-top: 5px;
`;

const Input2 = styled.Text`
  width: 105px;
  font-size: 9px;
  padding-top: 5px;
`;

const Span = styled.Text`
  font-size: 9px;
  width: 80px;
  text-align: center;
`;

const CheckBox = styled.Text`
  width: 23px;
  font-size: 9px;
  height: 14px;
  padding-top: 2px;
  padding-left: 8px;
  border: 1px solid black;
`;

const CheckBoxLabel = styled.Text`
  font-size: 9px;
  padding-left: 3px;
  padding-top: 1px;
`;
const Paragraph = styled.Text`
  font-size: 9px;
`;

const Footer = styled.Text`
  left: 35px;
  right: 35px;
  bottom: 25px;
  font-size: 11px;
  position: absolute;
  // text-align: center;
`;

// Create Document Component
const WorkerExitClearancePDF = ({
  selectedApplication,
  applicationData,
  ceoCode,
  cooCode,
  hraManagerCode,
  projectManagerCode,
  immediateSuperiorCode,
  supervisorCommentL1,
  supervisorCommentL2,
  supervisorCommentL3,
  projectManagerCommentL1,
  projectManagerCommentL2,
  projectManagerCommentL3,
  ...props
}) => (
  <Document>
    <Body size="A4" wrap>
      <Border>
        <Header fixed>
          <Image src={Logo} style={styles.image} />
        </Header>
        <Title style={{ borderTop: 1, borderBottom: 1 }}>
          Worker Exit Clearance
        </Title>
        <Section>
          <Row>
            <View style={{ paddingRight: 58 }}>
              <Label1>Name:</Label1>
            </View>
            <View style={{ paddingRight: 10 }}>
              <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 250 }}>" "</Input1>
            </View>
            <View style={{ paddingRight: 5 }}>
              <Label1>Employee No:</Label1>
            </View>
            <View style={{ paddingRight: 10 }}>
              <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 95 }}>" "</Input1>
            </View>
          </Row>
          <Row>
            <View style={{ paddingRight: 5 }}>
              <Label1>Department/Project:</Label1>
            </View>
            <View style={{ paddingRight: 10 }}>
              <Input1 style={{ borderBottom: 1, width: 250, }}>" "</Input1>
            </View>
            <View style={{ paddingRight: 18 }}>
              <Label1>Departure:</Label1>
            </View>
            <View style={{ paddingRight: 10 }}>
              <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 95 }}>" "</Input1>
            </View>
          </Row>
          <Row>
            <View style={{ paddingRight: 35 }}>
              <Label1>Designation:</Label1>
            </View>
            <View style={{ paddingRight: 10 }}>
              <Input1 style={{ borderBottom: 1, width: 250, }}>" "</Input1>
            </View>
          </Row>
        </Section>
        <SubTitle style={{ borderTop: 1, borderBottom: 1, marginTop: 5 }}>
          Project Site/Working Place
        </SubTitle>
        <Section>
          <Row>
            <Row >
              <CheckBox></CheckBox>
              <CheckBoxLabel>Tools</CheckBoxLabel>
            </Row>
            <Row style={{ paddingLeft: 90 }}>
              <CheckBox></CheckBox>
              <CheckBoxLabel>Equipment</CheckBoxLabel>
            </Row>
            <Row style={{ paddingLeft: 50 }}>
              <CheckBox></CheckBox>
              <CheckBoxLabel>Others</CheckBoxLabel>
            </Row>
          </Row>
          <RowEnd style={{ paddingTop: 20 }}>
            <Text style={{ textAlign: "center", fontSize: 9, width: 200 }}>
              <Text
                style={{
                  textAlign: "center",
                  borderBottom: 1,
                  fontSize: 20,
                  width: 180,
                  marginLeft: "5px",
                  color: "white",
                }}
              >
                Placeholder
              </Text>
            </Text>
            <Text
              style={{
                textAlign: "center",
                borderTop: 1,
                fontSize: 9,
                width: 180,
                paddingTop: "2px",
              }}
            >
              Signature $ Date
            </Text>
          </RowEnd>
        </Section>
        <SubTitle style={{ borderTop: 1, borderBottom: 1}}>
          Logistics
        </SubTitle>
        <Section>
          <Row>
            <Row >
              <CheckBox></CheckBox>
              <CheckBoxLabel>Vehicle</CheckBoxLabel>
            </Row>
            <Row style={{ paddingLeft: 90 }}>
              <CheckBox></CheckBox>
              <CheckBoxLabel>Keys</CheckBoxLabel>
            </Row>
            <Row style={{ paddingLeft: 50 }}>
              <CheckBox></CheckBox>
              <CheckBoxLabel>Petrol Card</CheckBoxLabel>
            </Row>
            <Row style={{ paddingLeft: 50 }}>
              <CheckBox></CheckBox>
              <CheckBoxLabel>Others</CheckBoxLabel>
            </Row>
          </Row>
          <RowEnd style={{ paddingTop: 20 }}>
            <Text style={{ textAlign: "center", fontSize: 9, width: 200 }}>
              <Text
                style={{
                  textAlign: "center",
                  borderBottom: 1,
                  fontSize: 20,
                  width: 180,
                  marginLeft: "5px",
                  color: "white",
                }}
              >
                Placeholder
              </Text>
            </Text>
            <Text
              style={{
                textAlign: "center",
                borderTop: 1,
                fontSize: 9,
                width: 180,
                paddingTop: "2px",
              }}
            >
              Signature $ Date
            </Text>
          </RowEnd>
        </Section>
        <SubTitle style={{ borderTop: 1, borderBottom: 1}}>
          Camps and Facilities
        </SubTitle>
        <Section>
          <Row>
            <Row >
              <CheckBox></CheckBox>
              <CheckBoxLabel>Accomodation and Furniture</CheckBoxLabel>
            </Row>
            <Row style={{ paddingLeft: 90 }}>
              <CheckBox></CheckBox>
              <CheckBoxLabel>Keys</CheckBoxLabel>
            </Row>
            <Row style={{ paddingLeft: 50 }}>
              <CheckBox></CheckBox>
              <CheckBoxLabel>Others</CheckBoxLabel>
            </Row>
          </Row>
          <RowEnd style={{ paddingTop: 20 }}>
            <Text style={{ textAlign: "center", fontSize: 9, width: 200 }}>
              <Text
                style={{
                  textAlign: "center",
                  borderBottom: 1,
                  fontSize: 20,
                  width: 180,
                  marginLeft: "5px",
                  color: "white",
                }}
              >
                Placeholder
              </Text>
            </Text>
            <Text
              style={{
                textAlign: "center",
                borderTop: 1,
                fontSize: 9,
                width: 180,
                paddingTop: "2px",
              }}
            >
              Signature $ Date
            </Text>
          </RowEnd>
        </Section>
        <SubTitle style={{ borderTop: 1, borderBottom: 1}}>
          Human Resources
        </SubTitle>
        <Section>
          <Row>
            <Row >
              <CheckBox></CheckBox>
              <CheckBoxLabel>Qatar ID</CheckBoxLabel>
            </Row>
            <Row style={{ paddingLeft: 90 }}>
              <CheckBox></CheckBox>
              <CheckBoxLabel>Qatar Driving License</CheckBoxLabel>
            </Row>
            <Row style={{ paddingLeft: 50 }}>
              <CheckBox></CheckBox>
              <CheckBoxLabel>Others</CheckBoxLabel>
            </Row>
          </Row>
          <RowEnd style={{ paddingTop: 20 }}>
            <Text style={{ textAlign: "center", fontSize: 9, width: 200 }}>
              <Text
                style={{
                  textAlign: "center",
                  borderBottom: 1,
                  fontSize: 20,
                  width: 180,
                  marginLeft: "5px",
                  color: "white",
                }}
              >
                Placeholder
              </Text>
            </Text>
            <Text
              style={{
                textAlign: "center",
                borderTop: 1,
                fontSize: 9,
                width: 180,
                paddingTop: "2px",
              }}
            >
              Signature $ Date
            </Text>
          </RowEnd>
        </Section>
        <SubTitle style={{ borderTop: 1, borderBottom: 1}}>
          Finance
        </SubTitle>
        <Section>
          <Row>
            <Row >
              <CheckBox></CheckBox>
              <CheckBoxLabel>Settlement</CheckBoxLabel>
            </Row>
            <Row style={{ paddingLeft: 50 }}>
              <CheckBox></CheckBox>
              <CheckBoxLabel>Others</CheckBoxLabel>
            </Row>
          </Row>
          <RowEnd style={{ paddingTop: 20 }}>
            <Text style={{ textAlign: "center", fontSize: 9, width: 200 }}>
              <Text
                style={{
                  textAlign: "center",
                  borderBottom: 1,
                  fontSize: 20,
                  width: 180,
                  marginLeft: "5px",
                  color: "white",
                }}
              >
                Placeholder
              </Text>
            </Text>
            <Text
              style={{
                textAlign: "center",
                borderTop: 1,
                fontSize: 9,
                width: 180,
                paddingTop: "2px",
              }}
            >
              Signature $ Date
            </Text>
          </RowEnd>
        </Section>
        <SubTitle style={{ borderTop: 1, borderBottom: 1}}>
          Employment Affidavit
        </SubTitle>
        <Section>
          <Text style={{fontSize: 8.5}}>
            I hereby declare that all the items issued to me by BGC were returned to the authorized
            representative and recieve the following items:
          </Text>
          <Row style={{ paddingTop: 3 }}>
            <Row >
              <CheckBox></CheckBox>
              <CheckBoxLabel>Passport</CheckBoxLabel>
            </Row>
            <Row style={{ paddingLeft: 43 }}>
              <CheckBox></CheckBox>
              <CheckBoxLabel>Ticket</CheckBoxLabel>
            </Row>
            <Row style={{ paddingLeft: 43 }}>
              <CheckBox></CheckBox>
              <CheckBoxLabel>Settlement</CheckBoxLabel>
            </Row>
            <Row style={{ paddingLeft: 50 }}>
              <CheckBox></CheckBox>
              <CheckBoxLabel>Others:</CheckBoxLabel>
              <Input1
              style={{
                borderBottom: 1,
                alignContent: "center",
                width: 130,
                paddingLeft: 3,
                fontSize: 8.5
              }}
              >
                Certificate of Employment
              </Input1>
            </Row>
          </Row>
          <Row>
            <Text style={{fontSize: 8.5}}>
              This is to confirm that I will be ended my service to BGC effective on
            </Text>
            <Input1
              style={{
                borderBottom: 1,
                alignContent: "center",
                width: 130,
                paddingLeft: 3,
                fontSize: 8.5
              }}
              >
                " "
              </Input1>
          </Row>
          <Text style={{fontSize: 8.5}}>
            It is understood that on effective date above, BGC has no legal responsibilities to 
            undersigned. However, BGC still willing to assist her employee until passing the Qatar Immigration.
          </Text>
          <RowEnd style={{ paddingTop: 20 }}>
            <Text style={{ textAlign: "center", fontSize: 9, width: 200 }}>
              <Text
                style={{
                  textAlign: "center",
                  borderBottom: 1,
                  fontSize: 20,
                  width: 180,
                  marginLeft: "5px",
                  color: "white",
                }}
              >
                Placeholder
              </Text>
            </Text>
            <Text
              style={{
                textAlign: "center",
                borderTop: 1,
                fontSize: 9,
                width: 180,
                paddingTop: 2,
              }}
            >
              Employee Signature
            </Text>
            <Text style={{ textAlign: "center", fontSize: 9, width: 100 }}>
              <Text
                style={{
                  textAlign: "center",
                  borderBottom: 1,
                  fontSize: 20,
                  width: 95,
                  marginLeft: "5px",
                  color: "white",
                }}
              >
                Placeholder
              </Text>
            </Text>
            <Text
              style={{
                textAlign: "center",
                borderTop: 1,
                fontSize: 9,
                width: 95,
                paddingTop: 2,
              }}
            >
              Date
            </Text>
          </RowEnd>
        </Section>
        <SubTitle style={{ borderTop: 1, borderBottom: 1}}>
          For BGC Human Resources Use Only
        </SubTitle>
      </Border>
      <Footer
        fixed>
        BGC-F-HRM18 V2.0, 21/12/2019                        Page 1/1                                                    <Image src={FooterImg} style={{ width: 100, height: 20 }} fixed />
      </Footer>
    </Body>
  </Document>
);

export default WorkerExitClearancePDF;
