import React, { useState, useEffect } from "react";
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from "reactstrap";
import { capitalizeFirstLetter } from "../../utils/stringUtils";

export type CardType = "courses" | "lessons" | "questions" | "course" | "lesson" | "question";

interface BaseItem {
    _id: string;
    file_name: string;
    name?: string;
    description?: string;
    language?: string;
    pivot_language?: string;
}

interface ClickableCardProps {
    item: BaseItem;
    onClick: (id: string) => void;
    type: CardType;
}

/**
 * @description Clickable card used in all list
 */
const ClickableCard: React.FC<ClickableCardProps> = ({ item, onClick, type }) => {
    const [imageExists, setImageExists] = useState<boolean>(true);

    const imageUrl = `${process.env.REACT_APP_API_URL}pictures/${type}s/${item.file_name}`;

    useEffect(() => {
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => setImageExists(true);
        img.onerror = () => setImageExists(false);
    }, [imageUrl]);

    return (
        <Card
            style={{ width: "18rem", cursor: "pointer" }}
            onClick={() => onClick(item._id)}
        >
            {imageExists && (
                <img alt="flag" crossOrigin="use-credentials" src={imageUrl} />
            )}

            <CardBody>
                <CardTitle tag="h5">
                    {type === "course"
                        ? capitalizeFirstLetter(item.language || "")
                        : item.name}
                </CardTitle>

                {type === "course" && item.pivot_language && (
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                        Depuis {item.pivot_language}
                    </CardSubtitle>
                )}

                {type !== "course" && item.description && (
                    <CardText>{item.description}</CardText>
                )}
            </CardBody>
        </Card>
    );
};

export default ClickableCard;
