import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

/*
 * FullCalendar 
 * 작성자 : 서현록
 * 작성일 : 2023.09.06
 */

export default class MyCalendar extends Component {
    constructor(props){
        super(props);
    }

    dateClick=(info)=>{
        alert(info.dateStr)
    }
    render() {
        return (
          <div style={{ margin:30 }} className='calendar-font'>
            <FullCalendar 
              defaultView="dayGridMonth" 
              plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin]}
              initialView={'dayGridMonth'}
              headerToolbar={
                {
                    start: 'today', 
                    center: 'title',
                    end: 'prev,next' 
                }
            }
            height={"52vh"}
            //dateClick={this.dateClick}
              events={[
                { title: '상견례', 
                  date: '2023-09-05', 
                  color: 'coral'},
                { title: '드레스 투어', 
                  start: '2023-09-20', 
                  end: '2023-09-23',
                  color: 'lightpink'}
            ]}
            />
          </div>
        );
    }
}