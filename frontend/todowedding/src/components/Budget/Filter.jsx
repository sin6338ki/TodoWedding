// import React, { useContext } from 'react'
// import { FilterContext } from '../Budget/BudgetContainer'
// import '../../assets/budget-css/Filter.css'

// const Filter = () => {
 
//     const { onChangeFilter, filterBaseYear } = useContext(FilterContext)

//      const handleChangeFilter = (event) => {
//         onChangeFilter(event.target.value)
//      }


//   return (
//     <select
//       className="filter fw-light"
//       id="filter"
//       name="filter"
//       value={filterBaseYear}
//       onChange={handleChangeFilter}
//       title="년도"
//       aria-label="내역을 보고 싶은 년도를 선택하세요."
//     >
//       <option value="2024">2024</option>
//       <option value="2023">2023</option>
//       <option value="2022">2022</option>
//     </select>
//   )
// }

// export default Filter