import React from 'react'

const Table = (data) => {
  return (
    data ? (
        <table>
            <tbody>
                <tr>
                    {Object.keys(data?.data[0]).map((nama) => (
                        
                            <th>{nama}</th>
                    
                    ))}
                </tr>
                {data?.data.map((item) =>  (
                    <tr key={item.id}>
                        {Object.values(item).map((nama) => (
                            <td>{nama}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    ) : (<div>Err</div>)
  )
}

export default Table