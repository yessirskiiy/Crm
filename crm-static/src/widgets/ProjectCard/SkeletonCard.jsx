import ContentLoader from "react-content-loader";


const Skeleton = () => {
    return (
        <ContentLoader
            speed={2}
            width={610}
            height={100}
            viewBox="0 0 630 100"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <circle cx="390" cy="391" r="31" />
            <rect x="1" y="10" rx="10" ry="10" width="610" height="90" />
        </ContentLoader>
    );
};

export default Skeleton;