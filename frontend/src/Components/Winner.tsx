import {Button, Subtitle, Title} from "@/Components/HomePage.tsx";

export const Home = () => {
    return (
        <div className="HomePage">
        <Title />
        <Subtitle />
        <Button onClick={handleBattleNow} />
    </div>
);
};
