import { ReactElement, useEffect, useState } from 'react';
import { NextPageWithLayout } from '../_app';
import { BlogLayout, HomeLayout } from '@/layouts';
import { Divider, Image, Tag, Typography } from 'antd';
import { useRouter } from 'next/router';
import {
    BlogItemDetailType,
    BlogItemType,
} from '@/modules/common/interfaces/GeneralsComponentType';
import {
    BlogItemList,
    BlogsTagsData,
    CommentData,
} from '@/modules/common/data';
import { config } from '@/modules/common/utils';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebook,
    faTwitter,
    faPinterest,
    faGooglePlus,
    faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { RelativeBlogs } from '@/modules/common/components/Generals/Blogs';

const { Title, Text } = Typography;
const DetailBlog: NextPageWithLayout = () => {
    const router = useRouter();
    const { slug } = router.query;
    const [blog, setBlog] = useState<BlogItemDetailType>();

    useEffect(() => {
        const currentBlog = BlogItemList.find(
            (blog: BlogItemType) => blog.slug === slug
        );

        const currentBlogWithContent: any = {
            ...currentBlog,
            content: `<p>
            Aenean et tempor eros, vitae sollicitudin velit.
            Etiam varius enim nec quam tempor, sed efficitur
            ex ultrices. Phasellus pretium est vel dui
            vestibulum condimentum. Aenean nec suscipit
            nibh. Phasellus nec lacus id arcu facilisis
            elementum. Curabitur lobortis, elit ut elementum
            congue, erat ex bibendum odio, nec iaculis lacus
            sem non lorem. Duis suscipit metus ante, sed
            convallis quam posuere quis. Ut tincidunt
            eleifend odio, ac fringilla mi vehicula nec.
            Nunc vitae lacus eget lectus imperdiet tempus
            sed in dui. Nam molestie magna at risus
            consectetur, placerat suscipit justo dignissim.
            Sed vitae fringilla enim, nec ullamcorper arcu.
        </p>
        <blockquote>
            <p>
                Quisque semper nunc vitae erat pellentesque,
                ac placerat arcu consectetur. In venenatis
                elit ac ultrices convallis. Duis est nisi,
                tincidunt ac urna sed, cursus blandit
                lectus. In ullamcorper sit amet ligula ut
                eleifend. Proin dictum tempor ligula, ac
                feugiat metus. Sed finibus tortor eu
                scelerisque scelerisque.
            </p>
        </blockquote>
        <p>
            Aenean et tempor eros, vitae sollicitudin velit.
            Etiam varius enim nec quam tempor, sed efficitur
            ex ultrices. Phasellus pretium est vel dui
            vestibulum condimentum. Aenean nec suscipit
            nibh. Phasellus nec lacus id arcu facilisis
            elementum. Curabitur lobortis, elit ut elementum
            congue, erat ex bibendum odio, nec iaculis lacus
            sem non lorem. Duis suscipit metus ante, sed
            convallis quam posuere quis. Ut tincidunt
            eleifend odio, ac fringilla mi vehicula nec.
            Nunc vitae lacus eget lectus imperdiet tempus
            sed in dui. Nam molestie magna at risus
            consectetur, placerat suscipit justo dignissim.
            Sed vitae fringilla enim, nec ullamcorper arcu.
        </p>
        <p>
            Suspendisse turpis ipsum, tempus in nulla eu,
            posuere pharetra nibh. In dignissim vitae lorem
            non mollis. Praesent pretium tellus in tortor
            viverra condimentum. Nullam dignissim facilisis
            nisl, accumsan placerat justo ultricies vel.
            Vivamus finibus mi a neque pretium, ut convallis
            dui lacinia. Morbi a rutrum velit. Curabitur
            sagittis quam quis consectetur mattis. Aenean
            sit amet quam vel turpis interdum sagittis et
            eget neque. Nunc ante quam, luctus et neque a,
            interdum iaculis metus. Aliquam vel ante mattis,
            placerat orci id, vehicula quam. Suspendisse
            quis eros cursus, viverra urna sed, commodo
            mauris. Cras diam arcu, fringilla a sem
            condimentum, viverra facilisis nunc. Curabitur
            vitae orci id nulla maximus maximus. Nunc
            pulvinar sollicitudin molestie.
        </p>`,
            tags: BlogsTagsData,
            comments: CommentData,
        };

        setBlog(currentBlogWithContent);
    }, [slug]);
    return (
        <article>
            <Image
                width={`100%`}
                height={360}
                src={`${config.publicUrl}/images/blog/${blog?.thumbnail}`}
            />
            <div className='blog_info_wrapper'>
                <div className='blog_info_inner'>
                    <Title level={2} className=''>
                        {blog?.title}
                    </Title>
                    <Divider />
                    <Title level={5}>
                        {`Đăng bởi ${blog?.author}`} {`/ ${blog?.category}`}
                    </Title>
                    <div className='post__info'>
                        <div
                            className='post_content'
                            dangerouslySetInnerHTML={{
                                __html: blog?.content || '',
                            }}
                        />
                        <Divider />
                        <div className='post_meta'>
                            <span>
                                <a href='#'>
                                    {blog?.comments?.length} bình luận
                                </a>
                            </span>
                            <span> / Tags: </span>
                            {blog?.tags.map((tag: any) => {
                                return (
                                    <Link
                                        key={`post-${blog.id}-tag-${tag.slug}`}
                                        href={`/bai-viet?tag=${tag.slug}`}
                                    >
                                        <Tag className='!tw-uppercase hover:!tw-bg-primaryOrange hover:tw-text-white'>
                                            {tag.name}
                                        </Tag>
                                    </Link>
                                );
                            })}
                        </div>
                        <Divider />
                        <div className='tw-mb-5'>
                            <Title
                                level={3}
                                className='!tw-text-[#242424] !tw-text-xl !tw-leading-6 !tw-font-semibold !tw-mr-8 !tw-inline'
                            >
                                Chia sẻ bài viết
                            </Title>
                            <ul className='tw-inline-flex tw-gap-4'>
                                <li>
                                    <FontAwesomeIcon
                                        icon={faFacebook}
                                        className='tw-cursor-pointer tw-text-xl'
                                        size='1x'
                                    />
                                </li>
                                <li>
                                    <FontAwesomeIcon
                                        icon={faTwitter}
                                        className='tw-cursor-pointer tw-text-xl'
                                        size='1x'
                                    />
                                </li>
                                <li>
                                    <FontAwesomeIcon
                                        icon={faPinterest}
                                        className='tw-cursor-pointer tw-text-xl'
                                        size='1x'
                                    />
                                </li>
                                <li>
                                    <FontAwesomeIcon
                                        icon={faGooglePlus}
                                        className='tw-cursor-pointer tw-text-xl'
                                        size='1x'
                                    />
                                </li>
                                <li>
                                    <FontAwesomeIcon
                                        icon={faLinkedin}
                                        className='tw-cursor-pointer tw-text-xl'
                                        size='1x'
                                    />
                                </li>
                            </ul>
                        </div>

                        <RelativeBlogs />
                    </div>
                </div>
            </div>
        </article>
    );
};

DetailBlog.getLayout = function getLayout(page: ReactElement) {
    return (
        <HomeLayout>
            <BlogLayout>{page}</BlogLayout>
        </HomeLayout>
    );
};
export default DetailBlog;
