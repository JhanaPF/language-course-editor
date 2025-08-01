import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import { capitalizeFirstLetter } from '../../utils/stringUtils';

/**
 * @description Clickable card used in all list
 * @param {Object} item: course/lesson/question
 * @param  {Function} onClick
 * @param {Object} type enum course,lesson,question 
 */
const ClickableCard = ({ item, onClick, type }) => {

    const [imageExists, setImageExists] = useState(true);

    const imageUrl = `${process.env.REACT_APP_API_URL}pictures/${type}s/${item.file_name}`;

    useEffect(() => {
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => setImageExists(true);
        img.onerror = () => setImageExists(false);
    }, [imageUrl]);

    return (
        <Card
            style={{ width: '18rem', cursor: 'pointer' }}
            onClick={() => onClick(item._id)}
        >
            {imageExists &&
                <img alt="flag" crossOrigin="use-credentials" src={imageUrl} />
            }

            <CardBody>

                <CardTitle tag="h5">
                    {type === "course" ?
                        capitalizeFirstLetter(item.language) :
                        item.name
                    }
                </CardTitle>

                {type === "course" &&
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                        Depuis {item.pivot_language}
                    </CardSubtitle>
                }

                {type !== "course" &&
                    <CardText>{item.description}</CardText>
                }

            </CardBody>
        </Card>
    );
};

export default ClickableCard;
