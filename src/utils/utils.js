import { axiosReq } from "../api/axiosDefaults";

export const fetchMoreData = async (resource, setResource) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, curr) => {
        return acc.some((accResult) => accResult.id === curr.id)
          ? acc
          : [...acc, curr];
      }, prevResource.results),
    }));
  } catch (err) {
    console.log(err);
  }
};

export const followHelper = (profile, clickedProfile, following_id) => {
  return profile.id === clickedProfile.id
    ? // The profile that was clicked is the same
      {
        ...profile,
        followers_count: profile.followers_count + 1,
        following_id,
      }
    : profile.is_owner
    ? // Update the following count
      { ...profile, following_count: profile.following_count + 1 }
    : // Just return the profile unchanged
      profile;
};

export const unfollowHelper = (profile, clickedProfile) => {
  return profile.id === clickedProfile.id
    ? // The profile that was clicked is the same
      {
        ...profile,
        followers_count: profile.followers_count - 1,
        following_id: null,
      }
    : profile.is_owner
    ? // Update the following count
      { ...profile, following_count: profile.following_count - 1 }
    : // Just return the profile unchanged
      profile;
};
