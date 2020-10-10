import React from 'react';
import { Document, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import styled from '@react-pdf/styled-components';
import Logo from '../../img/logo.jpg';
import FooterImg from '../../img/footerimg.png';
import moment from 'moment';

const styles = StyleSheet.create({
  image: { width: 130, height: 27 },
  pageBackground: {
    position: 'absolute',
    minWidth: '100%',
    minHeight: '100%',
    display: 'block',
    height: '100%',
    width: '100%',
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
  background-color: #E0E0E0;
  text-transform: uppercase;
`

const Label1 = styled.Text`
  font-size: 9px;
  // width: 110px;
  padding-top: 5px;
`

const Label2 = styled.Text`
  font-size: 9px;
  width: 65px;
  padding-top: 5px;
`

const Input1 = styled.Text`
  // width: 210px;
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
  bottom: 25px;
  font-size: 11px;
  position: absolute;
  // text-align: center;
`;

// Create Document Component
const ResignationPDF = ({ selectedApplication, applicationData, ceoCode, cooCode, hraManagerCode, projectManagerCode, immediateSuperiorCode, supervisorCommentL1,
  supervisorCommentL2, supervisorCommentL3, projectManagerCommentL1, projectManagerCommentL2, projectManagerCommentL3, ...props }) => (
  <Document>
    <Body size="A4" wrap>
      <Border>
        <Header fixed>
          <Image
            src={Logo}
            style={styles.image}
          />
        </Header>
        <Title style={{ borderTop: 1, borderBottom: 1, }}>Resignation Application</Title>
        <SubTitle style={{ borderTop: 1, borderBottom: 1, marginTop: 5 }}>Employee Information</SubTitle>
        <Section>
          <Row>
            <Label1>Employee Name:   </Label1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 285, paddingLeft: 3 }}>{applicationData.name === "" ? " " : applicationData.name}</Input1>
            <Label1 style={{ marginLeft: 5 }}>Employee No.:   </Label1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 70, paddingLeft: 3 }}>{applicationData.employee_code === "" ? " " : applicationData.employee_code}</Input1>
          </Row>
          <Row>
            <Label1>Department:   </Label1>
            <Input1 style={{ borderBottom: 1, width: 191, paddingLeft: 3 }}>{applicationData.department === "" ? " " : applicationData.department}</Input1>
            <Label1>Job Title:   </Label1>
            <Input1 style={{ borderBottom: 1, width: 210, paddingLeft: 3 }}>{applicationData.position === "" ? " " : applicationData.position}</Input1>
          </Row>
          <Row>
            <Label1>Joining Date:   </Label1>
            <Input1 style={{ borderBottom: 1, width: 190, paddingLeft: 3 }}>
              {applicationData.joining_date === "" ? " " : moment(applicationData.joining_date).format("MM/DD/YYYY")}
            </Input1>
            <Label1>Effective Resignation Date:   </Label1>
            <Input1 style={{ borderBottom: 1, width: 137, paddingLeft: 3 }}>
              {applicationData.effective_resignation_date === "" ? " " : moment(applicationData.effective_resignation_date).format("MM/DD/YYYY")}
            </Input1>
          </Row>
        </Section>
        <SubTitle style={{ borderTop: 1, borderBottom: 1, marginTop: 5 }}>Reason For Resignation</SubTitle>
        <Section style={{ paddingTop: 0 }}>
          <Input1 style={{ borderBottom: 1, width: 500, paddingLeft: 3 }}>
            {applicationData.reason_for_resignationL1 === "" ? " " : applicationData.reason_for_resignationL1}
          </Input1>
          <Input1 style={{ borderBottom: 1, width: 500, paddingLeft: 3 }}>
            {applicationData.reason_for_resignationL2 === "" ? " " : applicationData.reason_for_resignationL2}
          </Input1>
          <Input1 style={{ borderBottom: 1, width: 500, paddingLeft: 3 }}>
            {applicationData.reason_for_resignationL3 === "" ? " " : applicationData.reason_for_resignationL3}
          </Input1>
          <Input1 style={{ borderBottom: 1, width: 500, paddingLeft: 3 }}>
            {applicationData.reason_for_resignationL4 === "" ? " " : applicationData.reason_for_resignationL4}
          </Input1>
          <Row style={{ paddingTop: "10px", paddingBottom: "0px", justifyContent: "center" }}>
            <Text style={{ fontSize: 9 }}>
              I certify that this resignation is executed by me voluntarily and of my own free will.
            </Text>
          </Row>
          <Row style={{ paddingTop: "5px", paddingBottom: "0px", justifyContent: "center" }}>
            <View style={{marginLeft: 123}}>
              <Text style={{ textAlign: "center", fontSize: 9, width: 200 }}>
                {applicationData.employee_signature ?
                  <View>
                    <Image source={"http://localhost:3000/fetch/signature?code=" + applicationData.employee_code} style={{width: 130,height: 20}}/>
                  </View>
                  :
                  <Text style={{ textAlign: "center", borderBottom: 1, fontSize: 20, width: 180, marginLeft: "5px", color: "white" }}>
                    Placeholder
                  </Text>
                }
              </Text>
              <Text style={{ textAlign: "center", borderTop: 1, fontSize: 9, width: 180, paddingTop: "2px" }}>
                Employee Signature
              </Text>
            </View>
            <View style={{ paddingLeft: "10px", paddingTop: 12 }}>
              <Text style={{ textAlign: "center", fontSize: 9, width: 100 }}>
                {applicationData.employee_signature_date}
              </Text>
              <Text style={{ textAlign: "center", borderTop: 1, fontSize: 9, width: 100, paddingTop: "2px" }}>
                Date
              </Text>
            </View>
          </Row>
        </Section>
        <SubTitle style={{ borderTop: 1, borderBottom: 1, marginTop: 5 }}>Comments</SubTitle>
        <Section style={{ paddingTop: 0 }}>
          <Input1 style={{ borderBottom: 1, width: 500, paddingLeft: 3 }}>
            {applicationData.supervisor_commentL1 === "" ? " " : applicationData.supervisor_commentL1}
          </Input1>
          <Input1 style={{ borderBottom: 1, width: 500, paddingLeft: 3 }}>
            {applicationData.supervisor_commentL2 === "" ? " " : applicationData.supervisor_commentL2}
          </Input1>
          <Input1 style={{ borderBottom: 1, width: 500, paddingLeft: 3 }}>
            {applicationData.supervisor_commentL3 === "" ? " " : applicationData.supervisor_commentL3}
          </Input1>
          <Row style={{ paddingTop: "10px", paddingBottom: "0px", justifyContent: "center" }}>
            <View style={{marginLeft: 110}}>
              <Text style={{ textAlign: "center", fontSize: 9, width: 200 }}>
                {applicationData.immidiate_supervisor_manager_signature ?
                  <View>
                    <Image source={"http://localhost:3000/fetch/signature?code=" + immediateSuperiorCode} style={{width: 130,height: 20}}/>
                  </View>
                  :
                  <Text style={{ textAlign: "center", borderBottom: 1, fontSize: 20, width: 180, marginLeft: "5px", color: "white" }}>
                    Placeholder
                  </Text>
                }
              </Text>
              <Text style={{ textAlign: "center", borderTop: 1, fontSize: 9, width: 180, paddingTop: "2px" }}>
                Supervisor Name & Signature
              </Text>
            </View>
            <View style={{ paddingLeft: "10px", paddingTop: 12  }}>
              <Text style={{ textAlign: "center", fontSize: 9, width: 100 }}>
                {applicationData.immidiate_supervisor_sign_date ? moment(applicationData.immidiate_supervisor_sign_date).format("MM/DD/YYYY") : " "}
              </Text>
              <Text style={{ textAlign: "center", borderTop: 1, fontSize: 9, width: 100, paddingTop: "2px" }}>
                Date
              </Text>
            </View>
          </Row>
          <Input1 style={{ borderBottom: 1, width: 500, paddingLeft: 3 }}>
            {applicationData.project_manager_commentL1 === "" ? " " : applicationData.project_manager_commentL1}
          </Input1>
          <Input1 style={{ borderBottom: 1, width: 500, paddingLeft: 3 }}>
            {applicationData.project_manager_commentL2 === "" ? " " : applicationData.project_manager_commentL2}
          </Input1>
          <Input1 style={{ borderBottom: 1, width: 500, paddingLeft: 3 }}>
            {applicationData.project_manager_commentL3 === "" ? " " : applicationData.project_manager_commentL3}
          </Input1>
          <Row style={{ paddingTop: "5px", paddingBottom: "0px", justifyContent: "center" }}>
            <View>
              <Text style={{ textAlign: "center", fontSize: 9, }}>
                  <Text style={{ textAlign: "center", borderBottom: 1, fontSize: 20, marginLeft: "5px", color: "white" }}>
                    Placeholder
                  </Text>
              </Text>
              <Text style={{ textAlign: "center", fontSize: 9, width: 95, paddingTop: "2px", fontStyle: "italic" }}>
                (if applicable)
              </Text>
            </View>
            <View style={{ paddingLeft: "8px" }}>
              <Text style={{ textAlign: "center", fontSize: 9, width: 200 }}>
                {applicationData.project_manager_signature ?
                  <View>
                    <Image source={"http://localhost:3000/fetch/signature?code=" + projectManagerCode} style={{width: 130,height: 20}}/>
                  </View>
                  :
                  <Text style={{ textAlign: "center", borderBottom: 1, fontSize: 20, width: 180, marginLeft: "5px", color: "white" }}>
                    Placeholder
                  </Text>
                }
              </Text>
              <Text style={{ textAlign: "center", borderTop: 1, fontSize: 9, width: 180, paddingTop: "2px" }}>
                Project Manager's Name & Signature
              </Text>
            </View>
            <View style={{ paddingLeft: "10px", paddingTop: 12  }}>
              <Text style={{ textAlign: "center", fontSize: 9, width: 100 }}>
                {applicationData.project_manager_sign_date ? moment(applicationData.project_manager_sign_date).format("MM/DD/YYYY") : " "}
              </Text>
              <Text style={{ textAlign: "center", borderTop: 1, fontSize: 9, width: 100, paddingTop: "2px" }}>
                Date
              </Text>
            </View>
          </Row>
        </Section>
        <SubTitle style={{ borderTop: 1, borderBottom: 1, marginTop: 5 }}>Noted By Top Management</SubTitle>
        <Section>
          <Row>
            <View style={{ paddingLeft: "0px" }}>
              <Text style={{ textAlign: "center", fontSize: 9, width: 200 }}>
                {applicationData.coo_signature ?
                  <View>
                    <Image source={"http://localhost:3000/fetch/signature?code=" + cooCode} style={{width: 130,height: 20}}/>
                  </View>
                  :
                  <Text style={{ textAlign: "center", borderBottom: 1, fontSize: 20, width: 180, marginLeft: "5px", color: "white" }}>
                    Placeholder
                  </Text>
                }
              </Text>
              <Text style={{ textAlign: "center", borderTop: 1, fontSize: 9, width: 200, paddingTop: "2px" }}>
                COO
              </Text>
            </View>
            <View style={{ paddingLeft: "100px" }}>
              <Text style={{ textAlign: "center", fontSize: 9, width: 200 }}>
                {applicationData.ceo_signature ?
                  <View>
                    <Image source={"http://localhost:3000/fetch/signature?code=" + ceoCode} style={{width: 130,height: 20}}/>
                  </View>
                  :
                  <Text style={{ textAlign: "center", borderBottom: 1, fontSize: 20, width: 180, marginLeft: "5px", color: "white" }}>
                    Placeholder
                  </Text>
                }
              </Text>
              <Text style={{ textAlign: "center", borderTop: 1, fontSize: 9, width: 200, paddingTop: "2px" }}>
                CEO
              </Text>
            </View>
          </Row>
          <Row>
            <View style={{ paddingLeft: "0px", paddingTop: 7  }}>
              <Text style={{ textAlign: "center", fontSize: 9, width: 100, paddingLeft: 75 }}>
                {applicationData.coo_sign_date ? moment(applicationData.coo_sign_date).format("MM/DD/YYYY") : " "}
              </Text>
              <Text style={{ textAlign: "center", borderTop: 1, fontSize: 9, width: 200, paddingTop: "2px" }}>
                Date
              </Text>
            </View>
            <View style={{ paddingLeft: "100px", paddingTop: 7 }}>
              <Text style={{ textAlign: "center", fontSize: 9, width: 100, paddingLeft: 75 }}>
                {applicationData.ceo_sign_date ? moment(applicationData.ceo_sign_date).format("MM/DD/YYYY") : " "}
              </Text>
              <Text style={{ textAlign: "center", borderTop: 1, fontSize: 9, width: 200, paddingTop: "2px" }}>
                Date
              </Text>
            </View>
          </Row>
        </Section>
        <SubTitle style={{ borderTop: 1, borderBottom: 1, marginTop: 5 }}>For BGC Human Resource Use Only</SubTitle>
        <Section>
          <Row>
            <View style={{ marginLeft: 50 }}>
              <Text style={{ fontSize: 9 }}>
                Decision
              </Text>
            </View>
            <View style={{ marginLeft: 90 }}>
              <Row>
                <CheckBox>{selectedApplication.status === 'APPROVED' ? "X" : " "}</CheckBox>
                <CheckBoxLabel>Approved</CheckBoxLabel>
              </Row>
            </View>
            <View style={{ marginLeft: 90 }}>
              <Row>
                <CheckBox>{selectedApplication.status === 'DENIED' ? "X" : " "}</CheckBox>
                <CheckBoxLabel>Disapproved</CheckBoxLabel>
              </Row>
            </View>
          </Row>
          <Input1 style={{ borderBottom: 1, width: 500, paddingLeft: 3 }}>
            {applicationData.hr_manager_commentL1 === "" ? " " : applicationData.hr_manager_commentL1}
          </Input1>
          <Input1 style={{ borderBottom: 1, width: 500, paddingLeft: 3 }}>
            {applicationData.hr_manager_commentL2 === "" ? " " : applicationData.hr_manager_commentL2}
          </Input1>
          <Row style={{ paddingTop: "8px", paddingBottom: "0px", justifyContent: "center" }}>
            <View style={{marginLeft: 110}}>
              <Text style={{ textAlign: "center", fontSize: 9, width: 200 }}>
                {applicationData.hr_manager_signature ?
                  <View>
                    <Image source={"http://localhost:3000/fetch/signature?code=" + hraManagerCode} style={{width: 130,height: 20}}/>
                  </View>
                  :
                  <Text style={{ textAlign: "center", borderBottom: 1, fontSize: 20, width: 180, marginLeft: "5px", color: "white" }}>
                    Placeholder
                  </Text>
                }
              </Text>
              <Text style={{ textAlign: "center", borderTop: 1, fontSize: 9, width: 180, paddingTop: "2px" }}>
                HR Manager
              </Text>
            </View>
            <View style={{ paddingLeft: "10px", paddingTop: 12  }}>
              <Text style={{ textAlign: "center", fontSize: 9, width: 100 }}>
                {applicationData.hr_manager_sign_date ? moment(applicationData.hr_manager_sign_date).format("MM/DD/YYYY") : " "}
              </Text>
              <Text style={{ textAlign: "center", borderTop: 1, fontSize: 9, width: 100, paddingTop: "2px" }}>
                Date
              </Text>
            </View>
          </Row>
        </Section>
      </Border>
      <Footer
        fixed>
        BGC-F-HRM18 V2.0, 21/12/2019                        Page 1/1                                                    <Image src={FooterImg} style={{ width: 100, height: 20 }} fixed />
      </Footer>
    </Body>
  </Document>
);

export default ResignationPDF;