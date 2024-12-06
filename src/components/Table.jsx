export const Table = ({ positiveReviews, negativeReviews, neutralReviews }) => {
    const emotionsData = [
        { emotion: 'Positivo', quantity: positiveReviews },
        { emotion: 'Negativo', quantity: negativeReviews },
        { emotion: 'Neutro', quantity: neutralReviews }
    ];

    return (
        <table border="1">
            <thead>
            <tr>
                <th>Emoción</th>
                <th>Cantidad</th>
            </tr>
            </thead>
            <tbody>
            {emotionsData.map((item, index) => (
                <tr key={index}>
                    <td>{item.emotion}</td>
                    <td>{item.quantity}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};