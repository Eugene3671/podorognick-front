import TravellersStories from "@/src/components/TravellersStories/TravellersStories";

const ProfileSavedTabPage = () => {
  return (
    <div>
      <TravellersStories
        key="saved"
        sort="new"
        pageType="stories"
        buttonType="loadMore"
        mode="mySavedStories"
      />
    </div>
  );
};

export default ProfileSavedTabPage;
