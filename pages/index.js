import data from '/components/time.json'
import styles from '/styles/index.module.css'
import { v4 as uuidv4 } from 'uuid'
import EorzeaTime from 'eorzea-time'
import { useState, useEffect, Fragment } from 'react'

const MS_PER_MINUTE = 60000

// const addTime = (time, minsToAdd) => {
//   function D(J) {
//     return (J < 10 ? '0' : '') + J
//   }
//   let piece = time.split(':')
//   let mins = piece[0] * 60 + +piece[1] + +minsToAdd
//
//   return D(((mins % (24 * 60)) / 60) | 0) + ':' + D(mins % 60)
// }

const Data = ({ item, ET }) => {
  return item.map(({ Location, Point, Job, StartTime, EndTime }) => {
    const [show, setShow] = useState(true)

    const onClick = () => {
      setShow(false)
    }

    const ETStringCompare = Date.parse(`01/01/2011 ${ET}`)
    const ParsedStartTime = Date.parse(`01/01/2011 ${StartTime}`)
    const ParsedEndTime = Date.parse(`01/01/2011 ${EndTime}`)
    const compareByTime =
      ParsedStartTime < ETStringCompare && ParsedEndTime > ETStringCompare
    if (compareByTime) {
      const isWarning = ParsedEndTime - 30 * MS_PER_MINUTE < ETStringCompare
      const isDanger = ParsedEndTime - 10 * MS_PER_MINUTE < ETStringCompare
      return (
        <tr
          key={uuidv4()}
          className={
            !show
              ? styles.gray
              : isDanger
              ? styles.danger
              : isWarning
              ? styles.warning
              : null
          }
          onClick={() => onClick()}
        >
          <td>{Location}</td>
          <td>{Point}</td>
          <td>{Job}</td>
          <td>{StartTime.slice(0, -3)}</td>
          <td>{EndTime.slice(0, -3)}</td>
        </tr>
      )
    } else {
      !show && setShow(true)
    }
  })
}

const Home = () => {
  const [ET, setET] = useState(null)
  useEffect(() => {
    setTimeout(() => {
      setET(new EorzeaTime().toString())
    }, 1000)
  })
  return (
    <Fragment>
      {ET ? (
        <Fragment>
          <p className={styles.ETspan}>Eorzea Time: {ET.slice(0, -3)}</p>
          <table className={styles.tableBorder}>
            <thead>
              <tr>
                <th>Location</th>
                <th>Point</th>
                <th>Job</th>
                <th>Start Time</th>
                <th>End Time</th>
              </tr>
            </thead>
            <tbody>
              <Data item={data} ET={ET} />
            </tbody>
          </table>
        </Fragment>
      ) : (
        <p className={styles.ETspan}>INITIALISATION...</p>
      )}
    </Fragment>
  )
}

export default Home
