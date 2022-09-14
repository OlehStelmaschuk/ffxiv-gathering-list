import data from '/components/time.json'
import styles from '/styles/index.module.css'
import { v4 as uuidv4 } from 'uuid'
import EorzeaTime from 'eorzea-time'
import { useState, useEffect, Fragment } from 'react'

const MS_PER_MINUTE = 60000

const Data = ({ item, ET }) => {
  return item.map((item) => {
    const [show, setShow] = useState(true)

    const onClick = () => {
      setShow(false)
    }

    const ETStringCompare = Date.parse(`01/01/2011 ${ET}`)
    const StartTime = Date.parse(`01/01/2011 ${item.StartTime}`)
    const EndTime = Date.parse(`01/01/2011 ${item.EndTime}`)
    const compareByTime =
      StartTime < ETStringCompare && EndTime > ETStringCompare
    if (compareByTime) {
      const isWarning = EndTime - 30 * MS_PER_MINUTE < ETStringCompare
      const isDanger = EndTime - 10 * MS_PER_MINUTE < ETStringCompare
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
          <td>{item.Location}</td>
          <td>{item.Point}</td>
          <td>{item.Job}</td>
          <td>{item.StartTime.slice(0, -3)}</td>
          <td>{item.EndTime.slice(0, -3)}</td>
        </tr>
      )
    } else {
      !show && setShow(true)
    }
  })
}

const addTime = (time, minsToAdd) => {
  function D(J) {
    return (J < 10 ? '0' : '') + J
  }
  let piece = time.split(':')
  let mins = piece[0] * 60 + +piece[1] + +minsToAdd

  return D(((mins % (24 * 60)) / 60) | 0) + ':' + D(mins % 60)
}

const Home = () => {
  const [ET, setET] = useState(new EorzeaTime().toString())
  useEffect(() => {
    setTimeout(() => {
      // setET(new EorzeaTime().toString())
      // setET(addTime(ET, 60))
    }, 3000)
  })
  return (
    <Fragment>
      {/*<p className={styles.ETspan}>Eorzea Time: {ET && ET.slice(0, -3)}</p>*/}
      <p className={styles.ETspan}>Eorzea Time: {ET && ET}</p>
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
  )
}

export default Home
