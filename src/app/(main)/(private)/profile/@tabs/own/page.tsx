import TravellersStories from "@/src/components/TravellersStories/TravellersStories";

const ProfileOwnTabPage = () => {
  return (
    <div>
      <TravellersStories
        key="own"
        sort="new"
        pageType="stories"
        buttonType="loadMore"
        mode="myOwnStories"
      />
    </div>
  );
};

export default ProfileOwnTabPage;
