import TravellersStories from "@/src/components/TravellersStories/TravellersStories";
import TitleUpdater from "@/src/components/ui/TitleUpdater/TitleUpdater";

const ProfileOwnTabPage = () => {
  return (
    <>
      <TitleUpdater title="Мої публікації" />
      <TravellersStories
        key="own"
        sort="new"
        pageType="stories"
        buttonType="loadMore"
        mode="myOwnStories"
      />
    </>
  );
};

export default ProfileOwnTabPage;
