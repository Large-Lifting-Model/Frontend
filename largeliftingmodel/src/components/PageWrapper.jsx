import styles from "./PageWrapper.module.css"
import React from 'react'
import SpinnerFullPage from "./SpinnerFullPage";
import ErrorFullPage from "./ErrorFullPage";

import {useEffect, useState} from 'react'

/*
    Implement this wrapper as follows:

    import PageWrapper from '../components/PageWrapper.jsx'

    function PageX() {
	return (
		<PageWrapper title = 'Page X' apiURL = 'https://www.sampleurlhsadjshd.com'>
			<UnwrappedPageX />
		</PageWrapper>
	)
}

const UnwrappedPageX = ({ apidata }) => {
    return (
		<section>
				<h1>Put Your Page Content Here</h1>
				<h6>You Now Have Access to {apidata}</h6>
		</section>
    );
};


*/

const PageWrapper = ({ children, title, apiURL }) => {

    const dummyText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eget posuere lacus. Donec ut ultrices nisi, ac auctor nisl. Maecenas ultrices scelerisque libero vitae efficitur. Praesent ac condimentum erat. Integer facilisis est lobortis tortor malesuada convallis. Sed finibus, lorem porta porttitor ultricies, enim dui luctus lorem, cursus sodales dolor turpis nec enim. Nullam euismod condimentum nisl, sit amet cursus justo viverra at. Mauris eu velit ac lacus dignissim aliquet. Donec nec quam ultrices augue consectetur hendrerit in eget ex. Integer sed justo non erat tempus pharetra. Fusce vel arcu sit amet nibh blandit tempus accumsan venenatis felis. In venenatis eros a erat gravida venenatis. Phasellus sapien sem, tincidunt eu purus pellentesque, porttitor aliquet ante. Ut iaculis, diam at mattis malesuada, metus metus pulvinar lectus, vel porttitor odio turpis et augue. Nam et fringilla mi. Nullam vel odio eget diam luctus auctor. Morbi at dolor suscipit, tristique nisl in, pretium turpis. Vivamus aliquam diam semper ex eleifend, vel auctor dolor mattis. Integer varius condimentum tempor. Nulla bibendum metus eu quam blandit vehicula. Aenean eu hendrerit sem, id pretium dui. Aliquam lobortis porta risus vel aliquam. Curabitur at pretium arcu, sit amet suscipit magna. Nulla pharetra velit quis imperdiet facilisis. Donec tincidunt eget magna eget vehicula. Phasellus feugiat ipsum metus, at aliquet ante eleifend eget. Curabitur ut velit vel lacus luctus gravida. Cras ultrices est ante, nec ultricies ligula sodales eget. Praesent aliquam est sed ornare convallis. Nam at nulla orci. Sed non sem cursus, accumsan risus eu, varius ipsum. Integer eros nisi, tincidunt sed metus et, bibendum posuere magna. Duis congue non turpis nec dictum. Mauris vehicula in dolor efficitur volutpat. Praesent dignissim maximus feugiat. Cras vel aliquet metus. Etiam et turpis arcu. In augue quam, hendrerit quis consectetur vel, accumsan et nunc. Vivamus facilisis vel libero sed posuere. Maecenas non orci ut enim gravida ornare. Proin sagittis felis non ante rhoncus malesuada. Curabitur sit amet cursus massa, sit amet efficitur est. Aenean at facilisis dui. Nam nec eros sed erat congue maximus."

	const [apidata, setAPIData] = useState('');
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

    const childrenWithData = React.Children.map(children, child =>
        React.cloneElement(child, { apidata })
    );

	useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch(apiURL); // Replace with your API URL
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setAPIData(result);
            } catch (error) {
                setError(null)
                //setError(error.message);
				// TBD - Error disabled for now as we don't have an API yet
				setAPIData(dummyText);
				// TBD - remove dummy text

            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [apiURL]);

    return (
        <div className={styles.pagewrapper}>
            <section>
                <h1>{title}</h1>
                {error ? (
                    <ErrorFullPage errormsg={error}>

                    </ErrorFullPage>
                ) : ( loading ? (
                        <SpinnerFullPage />
                    ) : (
                        <div>{childrenWithData}</div>
                    )
                )}
            </section>
        </div>
    );
};

export default PageWrapper;