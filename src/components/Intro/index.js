import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const Intro = ({ data }) => {
    const sceneEl = useRef(null);

    // useEffect(() => {
    //     const parallaxInstance = new Parallax(sceneEl.current, {
    //         relativeInput: true,
    //     });

    //     parallaxInstance.enable();

    //     return () => parallaxInstance.disable();
    // }, []);
    return (
        <div className="hero-slider">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div
                            className="hero-img scene mt-10 mt-lg-0"
                            id="scene"
                            ref={sceneEl}
                        >
                            <div data-depth="0.2">
                                <img
                                    src={`${process.env.PUBLIC_URL}/images/slider/image1.png`}
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="hero-slide-content">
                            <h2
                                className="title animated"
                                dangerouslySetInnerHTML={{ __html: data.title }}
                            ></h2>
                            <p className="intro-desc">
                                Unlock the power to create a compelling resume
                                with our intuitive website. Tailor your
                                professional journey using our diverse templates
                                and user-friendly tools. Elevate your chances of
                                success by harnessing the ability to
                                effortlessly create a standout resume.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

Intro.propTypes = {
    data: PropTypes.object,
};

export default Intro;
