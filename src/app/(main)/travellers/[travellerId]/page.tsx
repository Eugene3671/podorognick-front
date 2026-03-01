import { Metadata } from "next";
import TravellerInfo from "@/src/components/TravellerInfo/TravellerInfo";
import TravellersStories from "@/src/components/TravellersStories/TravellersStories";
import css from "./TravellerPage.module.css";

type Props = {
  params: Promise<{ travellerId: string }>;
};

export const metadata: Metadata = {
  title: "Профіль мандрівника",
  description:
    "Дізнавайтесь про нові маршрути та пригоди інших мандрівників на нашій платформі.",
  openGraph: {
    title: "Профіль мандрівника | Подорожники",
    description: "Історії та досвід подорожей від нашої спільноти.",
    type: "profile",
  },
};

const TravellerPage = async ({ params }: Props) => {
  const { travellerId } = await params;
  return (
    <div className="container">
      <TravellerInfo travellerId={travellerId} />
      <h1 className={css.title}>Історії Мандрівника</h1>
      <TravellersStories
        sort="new"
        pageType="stories"
        buttonType="loadMore"
        mode="travellerStories"
        ownerId={travellerId}
      />
    </div>
  );
};

export default TravellerPage;
