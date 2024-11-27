import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" 
import { getTheme } from '../../../utils/getTheme'

export default function Calendar() {
  const { currentTheme  } = getTheme()
  const theme = currentTheme;

  const handleDateClick = (arg: any) => {
    alert(arg.dateStr)
  }

  return (
    <div className={`p-4`}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin ]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay',
        }}
        events={[
          { title: 'event 1', date: '2024-11-11' },
          { title: 'event 2', date: '2024-11-12' },
          { title: 'event 3', date: '2024-11-13' },
        ]}
        eventContent={(eventInfo) => (
          <div
            style={{
              backgroundColor: theme.global.brand,
              padding: "4px 8px",
              borderRadius: "4px",
            }}

            className={`${theme.hoverEffects.textBg}`}
          >
            {eventInfo.event.title}
          </div>
        )}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        editable={true}
        // add colors and styling to the calendar buttons
        themeSystem="custom"
        customButtons={{
          addEvent: {
            text: "Add Event",
            click: () => {
              alert("add event")
            },
          },
          
        }}
        buttonIcons={{
          prev: "chevron-left",
          next: "chevron-right",
        }}
        buttonText={{
          today: "Today",
          month: "Month",
          week: "Week",
          day: "Day",
        }}
        titleFormat={{
          year: "numeric",
          month: "long",
          day: "numeric",
        }}
        weekNumbers={true}
        weekNumberCalculation="ISO"
      />
    </div>
  )
}