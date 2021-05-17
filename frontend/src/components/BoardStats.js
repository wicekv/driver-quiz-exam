import React, { useState, useEffect } from 'react';
import { getUsers } from '../services/user.service';


const BoardStats = () => {
    const [data, setData] = useState(null)

    useEffect(async () => {
        const users = (await getUsers()).sort((a, b) => (a.allScore || 0) > (b.allScore || 0) ? -1 : 1);
        setData(users)
    }, [])


    return (
        <div>
            <h1>Statystyki użytkowników</h1>
            {data && (
                <table>
                    <tr>
                        <th>
                            Nick
                            </th>
                        <th>
                            Punkty
                            </th>
                    </tr>
                    {data.map(user => (
                        <tr>
                            <td>
                                {user.username}
                            </td>
                            <td>
                                {user.allScore || 0}
                            </td>
                        </tr>
                    ))}
                </table>
            )}
        </div>
    );
};

export default BoardStats;