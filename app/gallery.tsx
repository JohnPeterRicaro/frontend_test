"use client";

import { useEffect, useMemo, useState } from "react";
import Avatar from "boring-avatars";
import {
  FaRegCircleXmark,
  FaLocationDot,
  FaPhone,
  FaEnvelope,
  FaCaretDown,
  FaArrowDown,
  FaChevronDown,
} from "react-icons/fa6";

import Modal from "./modal";

import { Photo, User } from "./types/user";
import Image from "next/image";

export type GalleryProps = {
  users: User[];
};
const Gallery = ({ users }: GalleryProps) => {
  const [usersList, setUsersList] = useState(users);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSortField, setIsSortField] = useState<string>("");
  const [isSortDirection, setIsSortDirection] = useState("Ascending");
  const [isDropDown, setDropDown] = useState(false);
  const [isDropdownDirection, setIsDropdownDirection] = useState(false);

  const handleModalOpen = (id: number) => {
    const user = usersList.find((item) => item.id === id) || null;

    if (user) {
      setSelectedUser(user);
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const sortUsers = (field: string, direction: string) => {
    if (!field) {
      setUsersList(users);
      return;
    }

    const sortedList = [...usersList].sort((a, b) => {
      const valueA =
        field === "Email"
          ? a.email
          : field === "Company"
            ? a.company.name
            : field === "Name"
              ? a.name
              : "";
      const valueB =
        field === "Email"
          ? b.email
          : field === "Company"
            ? b.company.name
            : field === "Name"
              ? b.name
              : "";

      return direction === "Ascending"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    });

    setUsersList(sortedList);
  };

  const handleSortField = (field: string) => {
    setIsSortField(field);
    if (field) {
      sortUsers(field, isSortDirection);
    } else {
      setUsersList(users);
    }
  };

  const handleSortDirection = (direction: string) => {
    setIsSortDirection(direction);
    sortUsers(isSortField, direction);
  };

  useMemo(() => {
    sortUsers(isSortField, isSortDirection);
    console.log("selected sort");
  }, [isSortField, isSortDirection]);

  return (
    <div className="user-gallery">
      <div className="header">
        <h1 className="heading">Users</h1>
        <div className="sort-wrapper">
          <div className="sort">
            <label>Sort Field</label>
            <div className="sort-div" onClick={() => setDropDown(!isDropDown)}>
              <div
                id="sort-details"
                className={
                  isDropDown
                    ? "sort-details sort-details-active"
                    : "sort-details"
                }
              >
                {isSortField === "" ? (
                  <span style={{ color: "#cccccc" }}>Select...</span>
                ) : (
                  isSortField
                )}
              </div>
              {isDropDown && (
                <div className="sort-options">
                  <div onClick={() => handleSortField("Name")}>Name</div>
                  <div onClick={() => handleSortField("Company")}>Company</div>
                  <div onClick={() => handleSortField("Email")}>Email</div>
                </div>
              )}
              <div className="icon-down">
                <FaChevronDown
                  className={isDropDown ? "icon-cdown-active" : "icon-cdown"}
                />
              </div>
            </div>
          </div>
          <div className="sort">
            <label>Sort Direction</label>
            <div
              style={{ height: "39px !important" }}
              className="sort-div sort-div-direction"
              onClick={() => setIsDropdownDirection(!isDropdownDirection)}
            >
              <div
                id="sort-details"
                className={
                  isDropdownDirection
                    ? "sort-details sort-details-active"
                    : "sort-details"
                }
                style={{ height: "39px !important" }}
              >
                {isSortDirection === "" ? "Select..." : isSortDirection}
              </div>
              {isDropdownDirection && (
                <div className="sort-options sort-options-direction">
                  <div onClick={() => handleSortDirection("Ascending")}>
                    Ascending
                  </div>
                  <div onClick={() => handleSortDirection("Descending")}>
                    Descending
                  </div>
                </div>
              )}
              <div className="icon-down">
                <FaChevronDown
                  className={
                    isDropdownDirection ? "icon-cdown-active" : "icon-cdown"
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="items">
        {usersList.map((user, index) => (
          <div
            className="item user-card"
            key={index}
            onClick={() => handleModalOpen(user.id)}
          >
            <div className="body">
              {user.userPhoto === undefined ? (
                <Avatar
                  size={96}
                  name={user.name}
                  variant="marble"
                  colors={[
                    "#92A1C6",
                    "#146A7C",
                    "#F0AB3D",
                    "#C271B4",
                    "#C20D90",
                  ]}
                />
              ) : (
                <Image
                  src={user.userPhoto}
                  alt="avatar"
                  width={96}
                  height={96}
                  className="avatar-users"
                />
              )}
            </div>
            <div className="info">
              <div className="name">{user.name}</div>
              <div className="company">{user.company.name}</div>
            </div>
          </div>
        ))}
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          <div className="user-panel">
            <div className="header">
              <div
                role="button"
                tabIndex={0}
                className="close"
                onClick={handleModalClose}
              >
                <FaRegCircleXmark size={32} />
              </div>
            </div>
            <div className="body">
              {selectedUser && (
                <div className="user-info info">
                  <div className="avatar">
                    {selectedUser.userPhoto === undefined ? (
                      <Avatar
                        size={96}
                        name={selectedUser.name}
                        variant="marble"
                        colors={[
                          "#92A1C6",
                          "#146A7C",
                          "#F0AB3D",
                          "#C271B4",
                          "#C20D90",
                        ]}
                      />
                    ) : (
                      <Image
                        src={selectedUser.userPhoto}
                        alt="avatar"
                        width={240}
                        height={240}
                        className="avatar-users"
                      />
                    )}
                  </div>
                  <div className="user-details">
                    <div className="name">
                      {selectedUser.name} ({selectedUser.username})
                    </div>
                    <div className="field">
                      <FaLocationDot className="icon" />
                      <div className="data">{`${selectedUser.address.street}, ${selectedUser.address.suite}, ${selectedUser.address.city}`}</div>
                    </div>
                    <div className="field">
                      <FaPhone className="icon" />
                      <div className="value">{selectedUser.phone}</div>
                    </div>
                    <div className="field">
                      <FaEnvelope className="icon" />
                      <div className="value">{selectedUser.email}</div>
                    </div>
                    <div className="company">
                      <div className="company-name">
                        {selectedUser.company.name}
                      </div>
                      <div className="catchphrase">
                        {selectedUser.company.catchPhrase}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Gallery;
