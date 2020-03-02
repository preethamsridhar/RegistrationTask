import React, {useState, useEffect} from 'react'
import {Card, Form, Button, Radio, Select, DatePicker, Input, message} from 'antd';
import moment from 'moment';

import './styles.css';

const {Option} = Select;
const {TextArea} = Input;

const validDates = [
  '12/20/2019',
  '01/15/2020',
  '02/01/2020'
]

const registration = {
  selectedCourse: 0,
  courses: [ 
    {
      displayValue : "Technical Report Writing",
      selectedSubject: 0,
      subjects: [
        'Short Reports',
        "Annual Reports",
        "Presentations"
      ]
    },
    {
      displayValue : "English Literature",
      selectedSubject: 0,
      subjects: [
        "Poetry",
        "Short Stories",
        "Drama"
      ]
    },
    {
      displayValue : "Computer Sciences",
      selectedSubject: 0,
      subjects: [
        'Web Development',
        "Desktop Software Development",
        "Research and Analysis"
      ]
    }
  ]
}

const Index = (props) => {

  const [course, setcourse] = useState({...registration});
  const [isValidDate, setisValidDate] = useState(false);
  const [validDateMessage, setvalidDateMessage] = useState(null);
  const [submitLoading, setsubmitLoading] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        setsubmitLoading(true);
        setTimeout(()=>{
          setsubmitLoading(false);
          message.success("Registration successful");
        }, 2000)
      }
      else {
        setisValidDate(true);
        setvalidDateMessage(<p style={{color: 'red'}}>Please select the date</p>);
      }
    })
  }

  const changeCourse = e => {
    setcourse({
      ...course,
      selectedCourse: e.target.value
    });
  }

  const changeSubject = value => {
    let courseObj = {...course};
    courseObj.courses[course.selectedCourse].selectedSubject = value;
    console.log("Index -> courseObj", courseObj)
    setcourse(courseObj)
  }

  const { getFieldDecorator } = props.form;

  const onDateChange = (e)=> {
    if (e) {
      if (validDates.includes(moment(e).format('L'))) {
        console.log("in if");
        setisValidDate(false);
        setvalidDateMessage(null);
      }
      else {
        console.log("in else");
        setisValidDate(true);
        setvalidDateMessage(<p style={{color: 'red'}}>Your selected course and subject is not offered beginning from your selected date</p>);
      
      }
    }
    else {
      setisValidDate(true);
      setvalidDateMessage(<p style={{color: 'red'}}>Please select the date</p>);
    }
  }

  return (
    <div className="reg-div">
      <Card className="reg-card" title="Registration form">
        <Form onSubmit={handleSubmit}>
          <h4>Course</h4>
          <Form.Item name="course">
            <Radio.Group onChange={changeCourse} defaultValue={course.selectedCourse}>
              {
                registration.courses.map((course, i) => {
                  return (
                    <Radio
                      key={i}
                      value={i}
                    >
                      {course.displayValue}
                    </Radio>
                  )
                })
              }
            </Radio.Group>
          </Form.Item>
          <h4>Subject</h4>
          <Form.Item name="subject">
            <Select value={course.courses[course.selectedCourse].selectedSubject} style={{width: 300}} onChange={changeSubject}>
              {
                course.courses[course.selectedCourse].subjects.map((subject,i) => {
                  return (
                    <Option 
                      key={i} 
                      value={i}
                    >
                      {subject}
                    </Option>
                  )
                })
              } 
            </Select>
          </Form.Item>
          <h4>Data Picker</h4>
          <Form.Item 
            name="startDate"
            help={validDateMessage}
            validateStatus={isValidDate ? null : "error"}
          >
            {
              getFieldDecorator('startDate', {
                validateFirst: true,
                rules: [
                  { required: true, message: "Please select the date" }
                ]
              })(
                <DatePicker onChange={onDateChange} />     
              )
            }
          </Form.Item>
          <h4>Additional Notes (optional)</h4>
          <Form.Item >
            {
              getFieldDecorator('additional_notes', {
                validateFirst: true,
                rules: [
                  {min: 20, message: "Minimum note length should be 20"},
                  {max: 500, message: "Maximum note length can be 500"}
                ]
              })(
                <TextArea
                  rows={5}
                  placeholder="Please add your additional notes here ..."
                />
              )
            }
          </Form.Item>
          <Form.Item name="addtionalNotes">
            <Button
              type="primary"
              htmlType="submit"
              loading={submitLoading}
            >
              { submitLoading ? "Submitting ..." : "Submit"}
            </Button>
          </Form.Item>
        </Form> 
      </Card>
    </div>
  )
}

export default Form.create({name: 'register'})(Index)
