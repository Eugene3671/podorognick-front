import TravellersStories from "@/src/components/TravellersStories/TravellersStories";
import TitleUpdater from "@/src/components/ui/TitleUpdater/TitleUpdater";

const ProfileSavedTabPage = () => {
  return (
    <>
      <TitleUpdater title="Збережені історії" />
      <TravellersStories
        key="saved"
        sort="new"
        pageType="stories"
        buttonType="loadMore"
        mode="mySavedStories"
      />
    </>
  );
};

export default ProfileSavedTabPage;
