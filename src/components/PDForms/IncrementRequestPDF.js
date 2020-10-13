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

// const Label2 = styled.Text`
//   font-size: 9px;
//   width: 65px;
//   padding-top: 5px;
// `

const Input1 = styled.Text`
  // width: 210px;
  font-size: 9px;
  padding-top: 5px;
`

// const Input2 = styled.Text`
//   width: 105px;
//   font-size: 9px;
//   padding-top: 5px;
// `

// const Span = styled.Text`
//   font-size: 9px;
//   width: 80px;
//   text-align: center;
// `

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
// const Paragraph = styled.Text`
//   font-size: 9px;
// `

const Footer = styled.Text`
  left: 35px;
  right: 35px;
  bottom: 25px;
  font-size: 11px;
  position: absolute;
  // text-align: center;
`;

// Create Document Component
const IncrementRequestPDF = ({ selectedApplication, applicationData, ceoCode, cooCode, hraManagerCode, projectManagerCode, immediateSupervisorCode, supervisorCommentL1,
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
        <Title style={{ borderTop: 1, borderBottom: 1, }}>Increment Request</Title>
        <Section>
          <Row>
            <Label1>Name:   </Label1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 260, paddingLeft: 3, marginLeft: 53 }}>
              {applicationData.name === "" ? " " : applicationData.name}
            </Input1>
            <Label1 style={{ marginLeft: 5 }}>Date:   </Label1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 92, paddingLeft: 3, marginLeft: 32 }}>
              {applicationData.date === "" ? " " : moment(applicationData.date).format("MM/DD/YYYY")}
            </Input1>
          </Row>
          <Row>
            <Label1 style={{ paddingTop: 10 }}>Employee No.:   </Label1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 90, paddingLeft: 3, paddingTop: 10, marginLeft: 22}}>
              {applicationData.employee_code === "" ? " " : applicationData.employee_code}
            </Input1>
            <Label1 style={{ marginLeft: 5, paddingTop: 10 }}>Grade (if applicable):   </Label1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 70, paddingLeft: 3, paddingTop: 10, marginLeft: 5 }}>
              {applicationData.grade === "" ? " " : applicationData.grade}
            </Input1>
            <Label1 style={{ marginLeft: 5, paddingTop: 10 }}>Designation:   </Label1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 93, paddingLeft: 3, paddingTop: 10, marginLeft: 2 }}>
              {applicationData.designation === "" ? " " : applicationData.designation}
            </Input1>
          </Row>
          <Row>
            <Label1 style={{ paddingTop: 10 }}>Department/Project:   </Label1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 260, paddingLeft: 3, paddingTop: 10, marginRight: 5 }}>
              {applicationData.department === "" ? " " : applicationData.department}
            </Input1>
            <Label1 style={{ paddingTop: 10 }}>Nationality:   </Label1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 93, paddingLeft: 3, paddingTop: 10, marginLeft: 7 }}>
              {applicationData.nationality === "" ? " " : applicationData.nationality}
            </Input1>
          </Row>
        </Section>
        <Section>
          <Row>
            <View>
              <Row>
                <Label1>Supervisor/Manger Name:   </Label1>
                <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 138 }}>
                  {applicationData.immediate_supervisor_name ? applicationData.immediate_supervisor_name : " "}
                </Input1>
              </Row>
              <Label1>Supervisor/Manager Justification:</Label1>
              <View style={{ marginLeft: 10 }}>
                <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 240, paddingLeft: 3, paddingTop: 10 }}>
                  {applicationData.supervisor_notesL1 ? applicationData.supervisor_notesL1 : " "}
                </Input1>
                <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 240, paddingLeft: 3, paddingTop: 10 }}>
                  {applicationData.supervisor_notesL2 ? applicationData.supervisor_notesL2 : " "}
                </Input1>
                <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 240, paddingLeft: 3, paddingTop: 10 }}>
                  {applicationData.supervisor_notesL3 ? applicationData.supervisor_notesL3 : " "}
                </Input1>
                <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 240, paddingLeft: 3, paddingTop: 10 }}>
                  {applicationData.supervisor_notesL4 ? applicationData.supervisor_notesL4 : " "}
                </Input1>
                <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 240, paddingLeft: 3, paddingTop: 10 }}>
                  {applicationData.supervisor_notesL5 ? applicationData.supervisor_notesL5 : " "}
                </Input1>
              </View>
              <Row style={{ paddingTop: 10 }}>
                <Label1 style={{ paddingTop: 15 }}>Signature:</Label1>
                <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 112, paddingLeft: 3, }}>
                  {applicationData.immidiate_supervisor_manager_signature ?
                    <View>
                      <Image source={"http://localhost:3000/fetch/signature?code=" + immediateSupervisorCode} style={{width: 130,height: 20}}/>
                    </View>
                    :
                    <Text style={{ textAlign: "center", borderBottom: 1, fontSize: 20, width: 180, marginLeft: "5px", color: "white" }}>
                      Placeholder
                    </Text>
                  }
                </Input1>
                <Label1 style={{ paddingTop: 15 }}>Date:</Label1>
                <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 75, paddingLeft: 3, paddingTop: 15 }}>
                  {applicationData.immidiate_supervisor_sign_date ? moment(applicationData.immidiate_supervisor_sign_date).format("MM/DD/YYYY") : " "}
                </Input1>
              </Row>
            </View>
            <View>
              <View style={{ marginLeft: 12 }}>
                <Row>
                  <Label1>Project Manger Name:   </Label1>
                  <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 138 }}>
                    {applicationData.project_manager_name ? applicationData.project_manager_name : " "}
                  </Input1>
                </Row>
                <Label1>Project Manager Notes:</Label1>
                <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 240, paddingLeft: 3, paddingTop: 10 }}>
                  {applicationData.project_manager_notesL1 ? applicationData.project_manager_notesL1 : " "}
                </Input1>
                <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 240, paddingLeft: 3, paddingTop: 10 }}>
                  {applicationData.project_manager_notesL2 ? applicationData.project_manager_notesL2 : " "}
                </Input1>
                <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 240, paddingLeft: 3, paddingTop: 10 }}>
                  {applicationData.project_manager_notesL3 ? applicationData.project_manager_notesL3 : " "}
                </Input1>
                <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 240, paddingLeft: 3, paddingTop: 10 }}>
                  {applicationData.project_manager_notesL4 ? applicationData.project_manager_notesL4 : " "}
                </Input1>
                <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 240, paddingLeft: 3, paddingTop: 10 }}>
                  {applicationData.project_manager_notesL5 ? applicationData.project_manager_notesL5 : " "}
                </Input1>
                <Row style={{ paddingTop: 10 }}>
                  <Label1 style={{ paddingTop: 15 }}>Signature:</Label1>
                  <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 109, paddingLeft: 3, }}>
                    {applicationData.project_manager_signature ?
                      <View>
                        <Image source={"http://localhost:3000/fetch/signature?code=" + projectManagerCode} style={{width: 130,height: 20}}/>
                      </View>
                      :
                      <Text style={{ textAlign: "center", borderBottom: 1, fontSize: 20, width: 180, marginLeft: "5px", color: "white" }}>
                        Placeholder
                      </Text>
                    }
                  </Input1>
                  <Label1 style={{ paddingTop: 15 }}>Date:</Label1>
                  <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 70, paddingLeft: 3, paddingTop: 15 }}>
                    {applicationData.project_manager_sign_date ? moment(applicationData.project_manager_sign_date).format("MM/DD/YYYY") : " "}
                  </Input1>
                </Row>
                <RowEnd>
                  <View>
                    <Text style={{ textAlign: "center", fontSize: 9, width: 100, marginTop: 5 }}>
                      <Image source={"http://localhost:3000/fetch/signature?code=" + applicationData.employee_code} style={{width: 130, height: 20}}/>
                    </Text>
                    <Text style={{ textAlign: "center", borderTop: 1, fontSize: 9, width: 180, paddingTop: "2px" }}>
                      Employee Signature
                    </Text>
                  </View>
                </RowEnd>
              </View>
            </View>
          </Row>
        </Section>
        <SubTitle style={{ borderTop: 1, borderBottom: 1, marginTop: 5 }}>For BGC Human Resource Use Only</SubTitle>
        <Section>
          <Row>
            <Label1>Joining Date:   </Label1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 160, paddingLeft: 3, marginLeft: 35 }}>
              {applicationData.joining_date ? moment(applicationData.joining_date).format("MM/DD/YYYY") : " "}
            </Input1>
            <Label1 style={{ marginLeft: 5 }}>Date of Last Increment:   </Label1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 138, paddingLeft: 3, marginLeft: 5 }}>
              {applicationData.date_of_last_increment ? moment(applicationData.date_of_last_increment).format("MM/DD/YYYY") : " "}
            </Input1>
          </Row>
          <Row>
            <Label1 style={{ paddingTop: 10 }}>Current Basic Salary:   </Label1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 160, paddingLeft: 3, paddingTop: 10, marginLeft: 2 }}>
              {applicationData.basic ? applicationData.basic : " "}
            </Input1>
            <Label1 style={{ marginLeft: 5, paddingTop: 10 }}>Tranportation Allowance:   </Label1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 138, paddingLeft: 3, paddingTop: 10 }}>
              {applicationData.transportation_allowance ? applicationData.transportation_allowance : " "}
            </Input1>
          </Row>
          <Row>
            <Label1 style={{ paddingTop: 10 }}>General Allowance:   </Label1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 160, paddingLeft: 3, paddingTop: 10, marginLeft: 10 }}>
              {applicationData.general_allowance ? applicationData.general_allowance : " "}
            </Input1>
            <Label1 style={{ marginLeft: 5, paddingTop: 10 }}>Telephone Allowance:   </Label1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 138, paddingLeft: 3, paddingTop: 10, marginLeft: 12 }}>
              {applicationData.tel_allowance ? applicationData.tel_allowance : " "}
            </Input1>
          </Row>
          <Row>
            <Label1 style={{ paddingTop: 10 }}>Housing Allowance:   </Label1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 160, paddingLeft: 3, paddingTop: 10, marginLeft: 9 }}>
              {applicationData.housing_allowance ? applicationData.housing_allowance : " "}
            </Input1>
            <Label1 style={{ marginLeft: 5, paddingTop: 10 }}>Food Allowance:   </Label1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 138, paddingLeft: 3, paddingTop: 10, marginLeft: 33 }}>
              {applicationData.food_allowance ? applicationData.food_allowance : " "}
            </Input1>
          </Row>
        </Section>
        <SubTitle style={{ borderTop: 1, borderBottom: 1, marginTop: 5 }}>Approval</SubTitle>
        <Section>
          <Row>
            <View>
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 11, paddingLeft: 10, paddingBottom: 5 }}>
                  HRA Manager
                </Text>
                <Row>
                  <CheckBox>{applicationData.hr_manager_approved === true ? "X" : " "}</CheckBox>
                  <CheckBoxLabel>Approved</CheckBoxLabel>
                </Row>
                <Row>
                  <CheckBox>{applicationData.hr_manager_approved === false ? "X" : " "}</CheckBox>
                  <CheckBoxLabel>Dispproved</CheckBoxLabel>
                </Row>
              </View>
              <Row>
                <Label1>Notes:</Label1>
                <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 109, paddingLeft: 3, marginLeft: 17 }}>
                  {applicationData.hr_manager_notes ? applicationData.hr_manager_notes : " "}
                </Input1>
              </Row>
              <Row>
                <Label1 style={{ paddingTop: 15 }}>Signature:</Label1>
                <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 109, paddingLeft: 3, marginLeft: 3 }}>
                  {applicationData.hr_manager_signature ?
                    <View>
                      <Image source={"http://localhost:3000/fetch/signature?code=" + hraManagerCode} style={{width: 130,height: 20}}/>
                    </View>
                    :
                    <Text style={{ textAlign: "center", borderBottom: 1, fontSize: 20, width: 180, marginLeft: "5px", color: "white" }}>
                      Placeholder
                    </Text>
                  }
                </Input1>
              </Row>
              <Row>
                <Label1 style={{ paddingTop: 10 }}>Date:</Label1>
                <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 109, paddingLeft: 3, paddingTop: 10, marginLeft: 22 }}>
                  {applicationData.hr_manager_sign_date ? moment(applicationData.hr_manager_sign_date).format("MM/DD/YYYY") : " "}
                </Input1>
              </Row>
            </View>
            <View style={{ marginLeft: 20 }}>
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 11, paddingLeft: 10, paddingBottom: 5 }}>
                  Chief Operating Officer
                </Text>
                <Row>
                  <CheckBox>{applicationData.coo_approved === true ? "X" : " "}</CheckBox>
                  <CheckBoxLabel>Approved</CheckBoxLabel>
                </Row>
                <Row>
                  <CheckBox>{applicationData.coo_approved === false ? "X" : " "}</CheckBox>
                  <CheckBoxLabel>Dispproved</CheckBoxLabel>
                </Row>
              </View>
              <Row>
                <Label1>Notes:</Label1>
                <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 109, paddingLeft: 3, marginLeft: 17 }}>
                  {applicationData.coo_notes ? applicationData.coo_notes : " "}
                </Input1>
              </Row>
              <Row>
                <Label1 style={{ paddingTop: 15 }}>Signature:</Label1>
                <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 109, paddingLeft: 3, marginLeft: 3 }}>
                  {applicationData.coo_signature ?
                    <View>
                      <Image source={"http://localhost:3000/fetch/signature?code=" + cooCode} style={{width: 130,height: 20}}/>
                    </View>
                    :
                    <Text style={{ textAlign: "center", borderBottom: 1, fontSize: 20, width: 180, marginLeft: "5px", color: "white" }}>
                      Placeholder
                    </Text>
                  }
                </Input1>
              </Row>
              <Row>
                <Label1 style={{ paddingTop: 10 }}>Date:</Label1>
                <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 109, paddingLeft: 3, paddingTop: 10, marginLeft: 22 }}>
                  {applicationData.coo_sign_date ? moment(applicationData.coo_sign_date).format("MM/DD/YYYY") : " "}
                </Input1>
              </Row>
            </View>
            <View style={{ marginLeft: 20 }}>
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 11, paddingLeft: 10, paddingBottom: 5 }}>
                  Chief Executive Officer
                </Text>
                <Row>
                  <CheckBox>{applicationData.ceo_approved === true ? "X" : " "}</CheckBox>
                  <CheckBoxLabel>Approved</CheckBoxLabel>
                </Row>
                <Row>
                  <CheckBox>{applicationData.ceo_approved === false ? "X" : " "}</CheckBox>
                  <CheckBoxLabel>Dispproved</CheckBoxLabel>
                </Row>
              </View>
              <Row>
                <Label1>Notes:</Label1>
                <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 109, paddingLeft: 3, marginLeft: 17 }}>
                  {applicationData.ceo_notes ? applicationData.ceo_notes : " "}
                </Input1>
              </Row>
              <Row>
                <Label1 style={{ paddingTop: 15 }}>Signature:</Label1>
                <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 109, paddingLeft: 3, marginLeft: 3 }}>
                  {applicationData.ceo_signature ?
                    <View>
                      <Image source={"http://localhost:3000/fetch/signature?code=" + ceoCode} style={{width: 130,height: 20}}/>
                    </View>
                    :
                    <Text style={{ textAlign: "center", borderBottom: 1, fontSize: 20, width: 180, marginLeft: "5px", color: "white" }}>
                      Placeholder
                    </Text>
                  }
                </Input1>
              </Row>
              <Row>
                <Label1 style={{ paddingTop: 10 }}>Date:</Label1>
                <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 109, paddingLeft: 3, paddingTop: 10, marginLeft: 22 }}>
                  {applicationData.ceo_sign_date ? moment(applicationData.ceo_sign_date).format("MM/DD/YYYY") : " "}
                </Input1>
              </Row>
            </View>
          </Row>
        </Section>
        <SubTitle style={{ borderTop: 1, borderBottom: 1, marginTop: 5 }}>Management Desicion</SubTitle>
        <Section>
          <Row>
            <Label1>Basic Salary:   </Label1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 160, paddingLeft: 3, marginLeft: 35 }}>
              {applicationData.new_basic ? applicationData.new_basic : " "}
            </Input1>
            <Label1 style={{ marginLeft: 5 }}>Translation Allowance:   </Label1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 138, paddingLeft: 3, marginLeft: 10 }}>
              {applicationData.new_transportation_allowance ? applicationData.new_transportation_allowance : " "}
            </Input1>
          </Row>
          <Row>
            <Label1 style={{ paddingTop: 10 }}>General Allowance:   </Label1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 160, paddingLeft: 3, paddingTop: 10, marginLeft: 10 }}>
              {applicationData.new_general_allowance ? applicationData.new_general_allowance : " "}
            </Input1>
            <Label1 style={{ marginLeft: 5, paddingTop: 10 }}>Telephone Allowance:   </Label1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 138, paddingLeft: 3, paddingTop: 10, marginLeft: 12 }}>
              {applicationData.new_tel_allowance ? applicationData.new_tel_allowance : " "}
            </Input1>
          </Row>
          <Row>
            <Label1 style={{ paddingTop: 10 }}>Housing Allowance:   </Label1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 160, paddingLeft: 3, paddingTop: 10, marginLeft: 10 }}>
              {applicationData.new_housing_allowance ? applicationData.new_housing_allowance : " "}
            </Input1>
            <Label1 style={{ marginLeft: 5, paddingTop: 10 }}>Food Allowance:   </Label1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 138, paddingLeft: 3, paddingTop: 10, marginLeft: 32 }}>
              {applicationData.new_food_allowance ? applicationData.new_food_allowance : " "}
            </Input1>
          </Row>
          <Row style={{ marginLeft: 150 }}>
            <Label1 style={{ paddingTop: 10 }}>Effective Date:</Label1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 109, paddingLeft: 3, paddingTop: 10 }}>
              {applicationData.effective_date ? moment(applicationData.effective_date).format("MM/DD/YYYY") : " "}
            </Input1>
          </Row>
        </Section>
      </Border>
      <Footer
        fixed>
        BGC-F-HRM15 V2.0, 19/03/2020                        Page 1/1                                                    <Image src={FooterImg} style={{ width: 100, height: 20 }} fixed />
      </Footer>
    </Body>
  </Document>
);

export default IncrementRequestPDF;